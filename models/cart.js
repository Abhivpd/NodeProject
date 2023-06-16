import * as fs from 'fs'
import { join } from 'path';

const path = join('data', 'cart.json');

export class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(path, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!error) {
                cart = JSON.parse(fileContent);
            }
            // find existing Product
            const existingProductIndex = cart.products.findIndex(prod => prod.id = id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(path, JSON.stringify(cart), error => {
                console.log(error);
            })
        })
    }

    static deleteProducts() {
        
    }

    static getProducts(callback) {
        fs.readFile(path, (error, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (error) {
                callback([]);
            } else {
                callback(cart);
            }
        })
    }
}