import Express from 'express';
import { getCart, getCheckout, getIndex, getOrders, getProduct, getProducts } from '../controllers/shop.js';

export const shopRouter = Express.Router();

shopRouter.get('/', getIndex);

shopRouter.get('/products', getProducts);

shopRouter.get('/products/:productId', getProduct);

shopRouter.get('/cart', getCart);

shopRouter.get('/orders', getOrders);

shopRouter.get('/checkout', getCheckout);




// ,PTR

// ===> consider two routes,

// shopRouter.get('/products/:productId') and shopRouter.get('/products/delete');


// when we use this shopRouter.get('/products/delete'); route should be added first, if we use shopRouter.get('/products/:productId') first the segment delete will be considered as the dynamic segment 
// we should be using the more specific route first