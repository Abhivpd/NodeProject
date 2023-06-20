import { response } from "express";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([row, fieldData]) => {
            res.render('shop/product-list', {
                prods: row,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(error => console.log(error));
}

export const getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProductById(productId)
        .then(([product]) => {
            res.render('shop/product-details', {
                product: product[0],
                pageTitle: product[0].title,
                path: '/products'
            })
        })
}

export const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([row, fieldData]) => {
            res.render('shop/index', {
                prods: row,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(error => console.log(error))
}

export const getCart = (req, res, next) => {
    Cart.getCart(cart => {
        const cartProducts = []
        Product.fetchAll(products => {
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product });
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
