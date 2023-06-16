import { Product } from "../models/product.js";

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
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

export const getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) return res.redirect('/')
    const productId = req.params.productId;
    Product.fetchProductById(productId, product => {
        if (!product) return res.redirect('/');
        res.render('admin/add-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

export const postEditProducts = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect('/admin/products');
};

export const getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}

export const deleteAdminProducts = (req, res, next) => {
    const productId = req.params.productId
    Product.deleteProduct(productId, products => {
        if(products) res.redirect('/admin/products');
    });
}

export const postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    res.render()
}