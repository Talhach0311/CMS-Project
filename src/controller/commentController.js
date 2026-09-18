import News from '../model/news.js';
import Category from '../model/category.js';
import Comments from '../model/comments.js';
import User from '../model/user.js';

const getAllComments = async (req, res) => {
    try{
        const comments = await Comments.find().populate('article');

        res.render('admin/comments/index',{
            layout: 'layouts/adminLayout',
            comments
        })
    }catch(error){
        console.log(error)
    }
}

const updateCommentStatus = async (req, res) => {
    try {

        await Comments.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            }
        );

        res.redirect('/admin/comments');

    } catch (error) {
        console.log(error);
        res.redirect('/admin/comments');
    }
};

export {
    getAllComments,
    updateCommentStatus
}