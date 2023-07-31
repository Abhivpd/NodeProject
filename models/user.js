import mongoose, { Mongoose, Schema, mongo } from "mongoose";

const userSchma = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchma.methods.addToCart = function (product) {
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
                { productId: product._id, quantity: newQuantity }
            )
        }
    }

    else {
        updatedCartItems.push(
            { productId: product._id, quantity: newQuantity }
        )
    }

    const updatedCart = { items: updatedCartItems }

    this.cart = updatedCart;

    return this.save();
}

userSchma.methods.cartDeleteProduct = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());

    this.cart.items = updatedCartItems;

    return this.save();
}

userSchma.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

export default mongoose.model('User', userSchma)