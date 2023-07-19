import * as express from 'express';
import { adminRouter } from './routes/admin.js';
import { shopRouter } from './routes/shop.js';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error.js';
import { mongoConnect } from './util/database.js';
import User from './models/user.js';

const app = express.default();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    User.findUserById('64afbd09cecae76c4e83a93f')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        });
})

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(get404);

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
})
