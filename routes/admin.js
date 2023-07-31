import Express from 'express';
import { getAddProducts, getAdminProducts, getEditProducts, postAddProduct, postDeleteProduct, postEditProducts } from '../controllers/admin.js';


export const adminRouter = Express.Router();

// /admin/add-product => GET
adminRouter.get('/add-product', getAddProducts);

// /admin/add-product => POST
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/edit-product/:productId', getEditProducts);

adminRouter.post('/edit-product', postEditProducts);

adminRouter.get('/products', getAdminProducts);

adminRouter.post('/delete-product', postDeleteProduct);

