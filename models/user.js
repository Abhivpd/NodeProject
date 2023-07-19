import { ObjectId } from "mongodb";
import { getDb } from "../util/database.js";
class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    addProductToCart(product) {

        const db = getDb();
        const newQuantity = 1;
        let updatedCartItems = [];

        if (this.cart) {
            const cartProductIndex = this.cart.items.findIndex(item => {
                return (item.productId).toString() === (product._id).toString();
            })

            updatedCartItems = [...this.cart.items];

            if (cartProductIndex >= 0) {
                updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1;
            } else {
                updatedCartItems.push(
                    { productId: new ObjectId(product._id), quantity: newQuantity }
                )
            }
        }

        else {
            updatedCartItems.push(
                { productId: new ObjectId(product._id), quantity: newQuantity }
            )
        }

        const updatedCart = { items: updatedCartItems }

        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart } }
        )
    }

    static findUserById(userId) {
        const db = getDb()
        return db.collection('users').find({ _id: new ObjectId(userId) }).next();
    }

    getCartItems() {
        const db = getDb();
        const productIds = this.cart.items.map(item => item.productId);

        return db.collection('products').find({ _id: { $in: productIds } }).toArray()
            .then(products => {
                const cartproducts = products.map(product => {
                    const quantity = this.cart.items.find(item => (item.productId).toString() === (product._id).toString()).quantity;
                    return {
                        ...product, quantity: quantity
                    }
                })
                return cartproducts;
            })
    }

    cartDeleteProduct(productId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        console.log(updatedCartItems);
        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: updatedCartItems } } }
        )
    }

    createOrder() {
        const db = getDb();
        return this.getCartItems()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        username: this.username,
                    }
                }
                return db.collection('orders').insertOne(order);
            })
            .then(response => {
                this.cart = { items: [] };
                return db.collection('users').updateOne(
                    { _id: new ObjectId(this._id) },
                    { $set: { cart: { items: [] } } }
                );
            });
    };

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray()
    }
};

export default User;