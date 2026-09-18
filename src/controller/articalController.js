import News from '../model/news.js';
import Category from '../model/category.js';
import Comments from '../model/comments.js';
import User from '../model/user.js';
import { populate } from 'dotenv';

const getAllArticles = async (req, res) => {

    const page = parseInt(req.query.page) || 1;

    const limit = 5;

    const result = await News.paginate({}, {
        page,
        limit,
        populate: [
            {
                path: "author",
                select: "name"
            },
            {
                path: "category",
                select: "name"
            }
        ]
    })

    console.log(result.docs);

    res.render("admin/articles/index", {
        layout: 'layouts/adminLayout',
        articals: result.docs,
        currentPage: result.page,
        totalPages: result.totalPages
    });
}

const addArticlePage = async (req, res) => {
    const categories = await Category.find();
    res.render('admin/articles/create', {
        layout: 'layouts/adminLayout',
        categories
    })
}

const addArticle = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        console.log(req.body);
        console.log(req.file);

        await News.create({
            title,
            description,
            category,
            author: req.user.id,
            image: req.file.filename
        });

        res.redirect("/admin/articles");

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("Server Error");
    }
};

const updateArticlePage = (req, res) => {
    res.render('admin/articles/update', {
        layout: 'layouts/adminLayout'
    })
}

const updateArticle = (req, res) => {
    res.send("Update Article")
}


import path from 'path';
import fs from 'fs';
const deleteArticle = async (req, res) => {
    console.log(req.params.id)

    const news = await News.findById(req.params.id)

    if(!news){
        res.send("Artical Not Found")
    }

    const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        news.image
    );

    if(fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    await News.findByIdAndDelete(req.params.id);

    res.redirect('/admin/articles')

}


export {
    getAllArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
}
