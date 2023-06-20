import express from 'express';
import { adminRouter } from './routes/admin.js';
import { shopRouter } from './routes/shop.js';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error.js';
// import { pool as db} from './util/database.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// db.execute('SELECT * FROM products')
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

// app.use(urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(get404);

app.listen(3000,()=>{
    console.log("Server is listening")
});
