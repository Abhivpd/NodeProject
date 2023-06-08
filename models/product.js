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

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(path, JSON.stringify(products), (err) => {
                console.log(err);
            })
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
}

