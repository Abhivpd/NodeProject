import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
}

export const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProductById(productId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
}

export const getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
}

export const getCart = (req, res, next) => {
    Cart.getCart(cart => {
        const cartProducts = []
        Product.fetchAll(products => {
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product});
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart'
                    })
                }
            }
        })
    })
}

export const postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProductById(productId, product => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}

export const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}

export const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}