const Product = require('../models/product')
 exports.getaddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
   
  });
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }

  const prodId = req.params.ProductId;
  console.log(prodId);
  Product.findById(prodId).then(
    (product) => {
       if (!product) {
      
      return res.redirect('/');
      
        }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    }
  ).catch(err => {
    if (err) {console.log(err);}
  })
  }
exports.postaddProduct = (req, res, next) => {
    
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    console.log(imageURL);
  const product = new Product({
    title: title, price: price, description: description, imageUrl: imageURL, userId: req.user
  });
  product.save()
    .then(result => {
    console.log('Created product');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
  
}

exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
     res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
       path: '/admin/products',
            isAuthenticated: req.session.isLoggedIn
        })
  }).catch(err=>{console.log(err)});

}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedprice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const updatedDescription = req.body.description;
 
  Product.findById(prodId).then(
    (product) => {
      product.title = updatedTitle;
      product.price = updatedprice;
      product.imageUrl = updatedImageURL;
      product.description = updatedDescription;
      return product.save();
    }
  ).then(result => {
    console.log('Updated Product');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
  
  }

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(result => {
      console.log("Destroyed in seconds ");
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
  })

}