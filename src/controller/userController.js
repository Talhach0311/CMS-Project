import News from '../model/news.js';
import Category from '../model/category.js';
import Comments from '../model/comments.js';
import Setting from '../model/settings.js';
import User from '../model/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginPage = (req, res) => {
    res.render("admin/login", {
        layout: false
    })
}

const adminLogin = async (req, res) => {
    try {
        console.log(req.body)

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.send("User Not Find")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.send("Password Not Match");
        }

        const data = { id: user._id, name: user.name, role: user.role }

        const token = jwt.sign(data, process.env.JWT_sectret, { expiresIn: "1h" })

        console.log(token)

        res.cookie("token", token, { maxAge: 1000 * 60 * 60 })

        return res.redirect('/admin/dashboard')
    } catch (error) {
        console.log("Error", error)
    }

}

const dashboard = async (req, res) => {
    try {

        const totalUser = await User.countDocuments();
        const totalCategory = await Category.countDocuments();
        const totalNews = await News.countDocuments();

        res.render('admin/dashboard', {
            layout: 'layouts/adminLayout',
            user: req.user,
            totalUser,
            totalCategory,
            totalNews
        })
    } catch (error) {
        console.log("Error: ", error);
    }
}

const settingPage = (req, res) => {
    res.render('admin/setting', {
        layout: 'layouts/adminLayout',
        user: req.user
    })
}

const setting = async (req,res) => {
    try{
        console.log(req.body); 
        const {website_name, footer_description} = req.body;

      await Setting.create({
        website_name,
        footer_description,
        website_logo: req.file.filename
      })

      res.redirect('/admin/dashboard');
    }catch(error){
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {

    const page = req.query.page || 1;
    const limit = 5

    const result = await User.paginate({}, {
        page,
        limit
    });
    
    res.render('admin/users/index', {
        layout: 'layouts/adminLayout',
        users: result.docs,
        currentPage: result.page,
        totalPages: result.totalPages,
        user: req.user
    })
}

const addUserPage = (req, res) => {
    res.render('admin/users/create', {
        layout: 'layouts/adminLayout',
        user: req.user
    })
}

const addUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, role } = req.body;

        await User.create({
            name,
            email,
            password,
            role
        })

        res.redirect('/admin/users');
    } catch (error) {
        console.log("Error: ", error);
    }

}

const updateUserPage = async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(user)
    res.render('admin/users/update', {
        layout: 'layouts/adminLayout',
        user,
    })
}


const updateUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        user.name = name;
        user.email = email;
        user.role = role;

        // Password sirf tab update hoga jab new password diya ho
        if (password && password.trim() !== "") {
            user.password = password;
        }

        await user.save();

        res.redirect("/admin/users");

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).send("Server Error");
    }
};


const deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);

        res.redirect('/admin/users');

    } catch (error) {
        console.log("Error: ", error);
    }

}

const logout = (req, res) => {

    res.clearCookie('token')

    res.redirect('/admin/')
}


export {
    loginPage,
    adminLogin,
    getAllUsers,
    dashboard,
    settingPage,
    setting,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    logout
};