import * as mongobd from 'mongodb';
const mongoClient = mongobd.MongoClient;

export const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://Abhivpd:Abhi1234$@cluster0.rsxkjij.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            callback(client);
        })
        .catch(error => console.log(error))
}