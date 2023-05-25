const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//import
const categoriesRouter = require ('./app/api/v1/categories/router')
const imagesRouter = require ('./app/api/v1/images/router')
const talentsRouter = require ('./app/api/v1/talents/router')
const eventsRouter = require ('./app/api/v1/events/router')
const organizerRouter = require ('./app/api/v1/organizer/router')
const authCMSRouter = require ('./app/api/v1/auth/router')
const ordersCMSRouter = require ('./app/api/v1/orders/router')
const paymentsCMSRouter = require ('./app/api/v1/payments/router')
const participantRouter = require ('./app/api/v1/participant/router')

const v1 = '/api/v1';

const app = express();

const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handle-errors')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message:'Wellcome',
    });
});

// use Router 
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizerRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersCMSRouter);
app.use(`${v1}/cms`, paymentsCMSRouter);
app.use(`${v1}`, participantRouter);


// pastikan ditaro di bawah biar terakhir aja gitu, biar routernya di-run dlu
app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
