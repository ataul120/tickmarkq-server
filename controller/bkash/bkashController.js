import fetch from "node-fetch";
import dotenv from "dotenv";
import { BKASH_USERNAME, BKASH_PASSWORD, BKASH_APP_SECRET, BKASH_APP_KEY, BKASH_TOKEN_GET, BKASH_CREATE_PAYMENT, BKASH_EXECUTE, BKASH_CALLBACK_URL, BKASH_RESPONSE_STATUS } from "../../constans.js";
import { validatePaymentRequest } from "./validatePaymentRequest.js";
import purchaseModel from "../../model/users/purchaseModel.js";
import cache from "memory-cache";
import usersModel from "../../model/users/usersModel.js";

dotenv.config();

let bkashToken = null;
let tokenExpiration = null; // Store token expiration time


//  Get Bkash Token (With Expiration Handling)
export const getBkashToken = async () => {
    if (bkashToken && tokenExpiration && new Date() < tokenExpiration) {
        return bkashToken; // Return existing token if valid
    }

    const response = await fetch(BKASH_TOKEN_GET, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": BKASH_USERNAME,
            "password": BKASH_PASSWORD,
        },
        body: JSON.stringify({
            app_key: BKASH_APP_KEY,
            app_secret: BKASH_APP_SECRET
        }),
    });

    const data = await response.json();

    if (data.id_token) {
        bkashToken = data.id_token;
        tokenExpiration = new Date(new Date().getTime() + 3600 * 1000); // 1 hour validity
        return bkashToken;
    } else {
        throw new Error("Failed to get Bkash token: " + JSON.stringify(data));
    }
};

//  Create Payment
export const createPayment = async (req, res) => {
    const { courseId, amount } = req.body;
    const { userId } = req

    const validationResponse = await validatePaymentRequest(userId, courseId, amount)

    if (!validationResponse.success) {
        return res.status(400).json(validationResponse)
    }

    try {
        const token = await getBkashToken();

        const response = await fetch(BKASH_CREATE_PAYMENT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": token,
                "x-app-key": BKASH_APP_KEY
            },
            body: JSON.stringify({
                mode: "0011",
                payerReference: " ",
                callbackURL: BKASH_CALLBACK_URL,
                amount: amount,
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: "INV-" + Date.now()
            }),
        });

        const data = await response.json();
      
        if (data.paymentID) {

            const newPurchase = {
                userId,
                courseId,
                amount,
            };
            cache.put("payment_body", newPurchase, 600000); 

            res.json({ success: true, paymentID: data.paymentID, bkashURL: data.bkashURL });



        } else {
            res.status(400).json({ success: false, message: "Payment creation failed", error: data });
        }
    } catch (error) {
        res.status(500).json({ message: "Payment creation failed", error: error.message });
    }
};

// Execute Payment
export const executePayment = async (paymentID) => {
    try {
        const token = await getBkashToken();

        const response = await fetch(BKASH_EXECUTE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": token,
                "x-app-key": BKASH_APP_KEY
            },
            body: JSON.stringify({ paymentID }),
        });

        const data = await response.json();
        
        return data

    } catch (error) { 
        res.status(500).json({
            message: "Payment Failed!"
        })
    }
};


//  Callback API
export const paymentCallback = async (req, res) => {
    const { status, paymentID } = req.query;
    const bodyData = cache.get("payment_body")
    try {

        if (status === "cancel" || status === "failur") {

            await purchaseModel.findOneAndUpdate({ paymentID }, { status: "failed" });
            return res.redirect(`${BKASH_RESPONSE_STATUS}?status=${status}`)
        }

        if (status === "success") {
            const paymentData = await executePayment(paymentID);

            if (paymentData.statusCode === "0000") {

                const newPurchase = await purchaseModel({
                    status: "completed",
                    userId: bodyData.userId,
                    courseId: bodyData.courseId,
                    amount: bodyData.amount,
                    paymentId: paymentID,
                    paymentHistory: paymentData
                });

                await newPurchase.save()
                // Update the user model to include the new purchase ID in the user's purchase field
                await usersModel.findByIdAndUpdate(bodyData.userId, {
                    accessCourse: bodyData.courseId, // store purhcase course _id
                    paymentStatus: true
                });

                cache.del("payment_body");

                return res.redirect(`${BKASH_RESPONSE_STATUS}?status=${status}&paymentId=${paymentID}`);

            }

        }


    } catch (error) {
        await purchaseModel.findOneAndUpdate({ paymentID }, { status: "failed" });
        res.status(500).json({ message: "Error occurred during callback processing.", error: error.message });
    }
};
