import * as mongoDb from 'mongodb';
const mongoClient = mongoDb.MongoClient;

let _db;

export const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://Abhivpd:Abhi1234$@cluster0.rsxkjij.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            _db = client.db()
            callback();
        })
        .catch(error => console.log(error))
}

export const getDb = () => {
    if(_db) return _db;
    throw 'No Database Connection'
}