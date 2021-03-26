const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/',shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productID', shopController.getProduct);
router.post('/cart', shopController.postCart);
router.get('/cart', shopController.getCart );
router.post('/create-order', shopController.postOrder);
router.get('/orders',shopController.getOrders );
router.post('/cart-delete-item', shopController.postCartDelete);
module.exports = router;
