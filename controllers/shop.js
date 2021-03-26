
const Product = require('../models/product');
const user = require('../models/user');
const Order = require('../models/order');
exports.getProducts = (req, res, next) => {
 Product.find().then(products => {
   res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
    isAuthenticated: req.session.isLoggedIn
  });
    
  }).catch(err => {
    console.log(err);
  });
 
 
    

 
}

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID;
  
  Product.findById(prodID).then((product) => {
     res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
       path: '/products',
      isAuthenticated: req.session.isLoggedIn
    });
  }).catch(err => {
    console.log(err);
  });
   
 
}

exports.getIndex = (req, res, next) => {
  Product.find().then(products => {
     res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
       path: '/',
    isAuthenticated: req.session.isLoggedIn
    
  });
    
  }).catch(err => {
    console.log(err);
  });
  
  
}

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      
      });
 
    })
    .catch(err => {
      console.log(err);
    });
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
  

};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: {...i.productId._doc} };
      });
    
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
    
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
      

    }).then(
      result => {
        res.redirect('/orders');
      }
    )
    .catch(err => {
      console.log(err);
    });

}


exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id }).then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders,
      isAuthenticated: req.session.isLoggedIn
    });
  })
    .catch(err => { console.log(err) });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    
  })
}

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId).then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
    
}