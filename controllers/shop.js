import { response } from "express";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";

export const getProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(error => console.log(error))
}

export const getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(error => console.log(error))
}

export const getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(error => console.log(error))
}

export const getCart = (req, res, next) => {

    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(error => console.log(error))
    //     .then(cart => {
    //     res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your Cart',
    //         cart: cart
    //     })
    // })
    // .catch(error => console.log(error))

    // req.user.getCart()
    //     .then(cart => {
    //         return cart.getProducts()
    //             .then(products => {
    //                 res.render('shop/cart', {
    //                     path: '/cart',
    //                     pageTitle: 'Your Cart',
    //                     cart: cart,
    //                     products: products
    //                 })
    //             })
    //     })
    //     .catch(error => console.log(error));
    // Cart.getCart(cart => {
    //     const cartProducts = []
    //     Product.fetchAll(products => {
    //         for (let product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product });
    //                 res.render('shop/cart', {
    //                     path: '/cart',
    //                     pageTitle: 'Your Cart'
    //                 })
    //             }
    //         }
    //     })
    // })
}

export const postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => res.redirect('/cart'))
        .catch(error => console.log(error))
}

export const cartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    console.log(productId)

    req.user.cartDeleteProduct(productId)
        .then(() => res.redirect('/cart'))
        .catch((error) => console.log(error));
}

export const postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(item => {
                return { quantity: item.quantity, product: { ...item.productId._doc } }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart()
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(error => console.log(error))
}

export const getOrders = (req, res, next) => {
    // req.user.getOrders({ include: ['products'] })
    //     .then(orders => {
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Your Orders',
    //             orders: orders
    //         })
    //     })

    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
    // req.user.getOrders()
    //     .then(orders => {
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Your Orders',
    //             orders: orders
    //         })
    //     })
    //     .catch(error => console.log(error))
}