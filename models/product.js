import * as fs from 'fs';
import { join } from 'path';

const getProductsFromFile = callback => {
    const path = join(
        'data',
        'products.json'
    );
    fs.readFile(path, (error, fileContent) => {
        if (error) {
            return callback([]);
        }
        callback(JSON.parse(fileContent))
    })
}

const path = join(
    'data',
    'products.json'
);

export class Product {

    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                console.log(existingProductIndex);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(path, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static fetchProductById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        })
    }

    static deleteProduct(id, callback) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(product => product.id !== id)
            if (deleteProductIndex) {
                products.splice(deleteProductIndex - 1, 1);
                fs.writeFile(path, JSON.stringify(products), (err) => {
                    callback(products)
                    console.log(err);
                })
            }
            fs.writeFile(path, JSON.stringify(updatedProducts), error => {
                if (!err) {
                    
                }
            });

        })
    }
}

