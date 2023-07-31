import * as express from 'express';
import { adminRouter } from './routes/admin.js';
import { shopRouter } from './routes/shop.js';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error.js';
import User from './models/user.js';
import mongoose from 'mongoose';

const app = express.default();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    User.findById('64c0000985ed3d44dce21502')
        .then(user => {
            req.user = user;
            next();
        });
})

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(get404);

mongoose.connect('mongodb+srv://Abhivpd:Abhi1234$@cluster0.rsxkjij.mongodb.net/shop?retryWrites=true&w=majority')
    .then(response => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Abhishek',
                        email: 'abhishekvpd"gmail.com',
                        cart: {
                            item: []
                        }
                    })
                    user.save();
                }
            })
        app.listen(3000, () => console.log('server is running'))
    })
    .catch(error => console.log(error))
