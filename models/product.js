import { pool as db } from "../util/database.js";

export class Product {

    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]
        )
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')   //   * => everything (not all the rows, but all the fields)
    }

    static fetchProductById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }

    static deleteProduct() {
    }
}