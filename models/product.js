import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

class Product {


}

export default Product;

// import { ObjectId } from "mongodb";
// import { getDb } from "../util/database.js";
// class Product {
//     constructor(title, price, description, imageUrl, productId, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = productId ? new ObjectId(productId) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let operation;

//         if (this._id) {
//             operation = db.collection('products').updateOne({ _id: new ObjectId(this._id) }, { $set: this });
//         }
//         else {
//             operation = db.collection('products').insertOne(this);
//         }

//         return operation
//             .then((response) => console.log(response))
//             .catch((error) => console.log(error))
//     }


//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//     }

//     static findProductById(productId) {
//         const db = getDb();
//         return db.collection('products').find({ _id: new ObjectId(productId) }).next()
//     }

//     static deleteProduct(productId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({ _id: new ObjectId(productId) })
//     }
// }

// export default Product;