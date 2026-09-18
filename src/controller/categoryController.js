import News from '../model/news.js';
import Category from '../model/category.js';
import Comments from '../model/comments.js';
import User from '../model/user.js';

const getAllCategories = async (req, res) => {

    try {
        const category = await Category.find()

        console.log(category)

        res.render('admin/category/index', {
            layout: 'layouts/adminLayout',
            user: req.user,
            category
        })
    } catch (error) {
        console.log(error)
    }
}

const addCategoryPage = (req, res) => {
    res.render('admin/category/create', {
        layout: 'layouts/adminLayout',
        user: req.user
    })
}

const addCategory = (req, res) => {
    try{
        console.log(req.body)

        const {name, description} = req.body;

        Category.create({
            name,
            description
        })

        res.redirect('/admin/categories')

    }catch(error){
        console.log(error)
    }
}

const updateCategoryPage = (req, res) => {
    res.render('admin/category/update', {
        layout: 'layouts/adminLayout',
        user: req.user
    })
}

const updateCategory = (req, res) => {
    console.log(req.params.id)
}

const deleteCategory = async (req, res) => {
    try{
        console.log(req.params.id)
        await Category.findByIdAndDelete(req.params.id);
        res.redirect('/admin/categories')
    }catch(error){
        console.log(error)
    }
}

export {
    getAllCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}