import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema

const orderSchema = new schema({
    products: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
})

export default mongoose.model('Order', orderSchema);