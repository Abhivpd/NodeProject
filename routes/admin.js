import Express from 'express';
import { getAddProducts, getAdminProducts, postAddProduct } from '../controllers/admin.js';


export const adminRouter = Express.Router();

// /admin/add-product => GET
adminRouter.get('/add-product', getAddProducts);

// /admin/add-product => POST
adminRouter.post('/add-product', postAddProduct);

adminRouter.get('/products', getAdminProducts);

