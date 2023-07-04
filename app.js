import * as express from 'express';
import { adminRouter } from './routes/admin.js';
import { shopRouter } from './routes/shop.js';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error.js';
import { sequelize } from './util/database.js';
import { Product } from './models/product.js';
import { User } from './models/user.js';
import { Cart } from './models/cart.js';
import { CartItem } from './models/cart-item.js';
import { Order } from './models/order.js';
import { OrderItems } from './models/order-items.js';

const app = express.default();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error))
})

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItems });

sequelize.sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) return User.create({ name: 'Abhishek', email: 'abhishekvpd@gmail.com' })
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000, () => {
            console.log("Server is listening")
        });
    })
    .catch(error => {
        console.log(error)
    })
