import express from 'express';
const router = express.Router();

// Importing user controller functions
import {
  loginPage,
  adminLogin,
  logout,
  getAllUsers,
  dashboard,
  setting,
  settingPage,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser
} from '../controller/userController.js';

import {
  getAllCategories,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory
} from '../controller/categoryController.js';

import {
  getAllArticles,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle
} from '../controller/articalController.js'

import { getAllComments, updateCommentStatus } from '../controller/commentController.js';

import isAuth from '../middleware/authMiddleware.js'

import isAdmin from '../middleware/roleMiddleware.js';
import uploads from '../middleware/uploadMiddleware.js';

// Admin Login Routes
router.get('/', loginPage);
router.post('/login', adminLogin);
router.get('/logout', isAuth, logout);
router.get('/dashboard', isAuth, dashboard);
router.get('/setting-page', isAuth, settingPage);
router.post('/setting', isAuth, uploads.single('website_logo'), setting);

// User Curd Routes
router.get('/users', isAuth, isAdmin, getAllUsers);
router.get('/add-user-page', isAuth, isAdmin, addUserPage);
router.post('/add-user', isAuth, isAdmin, addUser);
router.get('/update-user-page/:id', isAuth, isAdmin, updateUserPage);
router.post('/update-user/:id', isAuth, isAdmin, updateUser);
router.get('/delete-user/:id', isAuth, isAdmin, deleteUser);

// Category Curd Routes
router.get('/categories', isAuth, getAllCategories);
router.get('/add-category-page', isAuth, addCategoryPage);
router.post('/add-category', isAuth, addCategory);
router.get('/update-category/:id', isAuth, updateCategoryPage);
router.post('/update-category/:id', isAuth, updateCategory);
router.get('/delete-category/:id', isAuth, deleteCategory);



// Artical Curd Routes
router.get('/articles', isAuth, getAllArticles);
router.get('/add-article-page', isAuth, addArticlePage);
router.post('/add-article', isAuth, uploads.single('image'), addArticle);
router.get('/update-article-page/:id', isAuth, updateArticlePage);
router.post('/update-article/:id', isAuth, updateArticle);
router.get('/delete-article/:id', isAuth, deleteArticle);


//Comments curd routes
router.get('/comments', isAuth, getAllComments);

router.post('/update-status/:id', isAuth, isAdmin, updateCommentStatus)












export default router;