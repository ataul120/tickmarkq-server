import Seo from "../../model/admin/seoModel.js";


// GET: Fetch SEO Data
export async function getSeo(req, res) {
    try {
        const seo = await Seo.findOne();
        res.status(200).json(seo || {})
    } catch (error) {
        res.status(500).json({
            message: "Failed to fatch Seo Data"
        })
    }
}

// POST: Create or Update SEO Data
export async function PostSeo(req, res) {
    const { title, description, keywords, icons } = req.body;

    let seo = await Seo.findOne();
    if (seo) {
        seo.title = title;
        seo.description = description;
        seo.keywords = keywords;

        if (icons) {
            seo.icons = icons;
        }

        await seo.save();
    } else {
        seo = await Seo.create({ title, description, keywords, icons: icons || undefined });
    }

    res.status(201).json({ success: true, message: "SEO Updated Successfully!" });
}
