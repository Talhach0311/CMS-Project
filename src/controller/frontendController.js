
import News from '../model/news.js';
import Category from '../model/category.js';
import Comments from '../model/comments.js';
import User from '../model/user.js';


const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;

        const result = await News.paginate(
            {},
            {
                page,
                limit,
                populate: [
                    {
                        path: "author",
                        select: "name"
                    },
                    {
                        path: "category",
                        select: "name image"
                    }
                ]
            }
        );

        res.render("index", {
            layout: 'layouts/frontendLayout',
            articals: result.docs,
            currentPage: result.page,
            totalPages: result.totalPages
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

const articalByCategory = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate('author').populate('category')

        res.render('category', {
            layout: 'layouts/frontendLayout',
            news
        })
    } catch (error) {
        console.log(error)
    }
}

const singleArtical = async (req, res) => {
    
    try {
        const news = await News.findById(req.params.id).populate('author').populate('category')

        const comments = await Comments.find({
            article: req.params.id,
            status: 'approved'
        })
        
        res.render('single', {
        layout: 'layouts/frontendLayout',
        news,
        comments
    })
    } catch (error) {
        console.log(error)
    }
}

const searchArtical = (req, res) => {

    res.render('search', {
        layout: 'layouts/frontendLayout',
    })
}

const loginPage = (req, res) => {
    res.render('admin/login', {
        layout: false,
    })
}

const addComment = async (req, res) => {
    try{
        const {name, email, content} = req.body
         await Comments.create({
            name,
            email,
            content,
            article: req.params.id
         })

         res.redirect('/')

    }catch(error){
        console.log(error)
    }
}


export {
    index,
    articalByCategory,
    singleArtical,
    searchArtical,
    loginPage,
    addComment
}
