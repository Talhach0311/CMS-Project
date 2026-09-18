import express from 'express';
const router = express.Router();
import {
    index,
    articalByCategory,
    singleArtical,
    searchArtical,
    loginPage,
    addComment
} from '../controller/frontendController.js';


router.get('/', index);
router.get('/category/:id', articalByCategory);
router.get('/single-artical/:id', singleArtical);
router.get('/search', searchArtical);
router.get('/loginPage', loginPage);
router.post('/comment/:id', addComment);



export default router;
