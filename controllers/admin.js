import { response } from "express";
// import { Product } from "../models/product.js";

export const getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

export const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
        // Product.create({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description,
        //     userId: req.user.id
        // })
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))
}

export const getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) return res.redirect('/')
    const productId = req.params.productId;
    // Product.findByPk(productId)
    //     .then(product => {
    //         if (!product) return res.redirect('/');
    //         res.render('admin/add-product', {
    //             pageTitle: 'Edit Product',
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product: product
    //         });
    //     })
    //     .catch(error => console.log(error))
    req.user.getProducts({ where: { id: productId } })
        .then(products => {
            const product = products[0];
            if (!product) return res.redirect('/');
            res.render('admin/add-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(error => console.log(error))
};

export const postEditProducts = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save()
        })
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))
};

export const getAdminProducts = (req, res, next) => {
    // Product.findAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             prods: products,
    //             pageTitle: 'Admin Products',
    //             path: '/admin/products'
    //         });
    //     })
    //     .catch(error => console.log(error))
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(error => console.log(error))
}

export const postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({ where: { id: productId } })
        .then(() => res.redirect('/admin/products'))
        .catch(error => console.log(error))

    // Product.findByPk(productId)
    // .then(product => {
    //     return product.destroy();
    // })
    // .then(() => res.redirect('/admin/products'))
    // .catch(error => console.log(error));
}