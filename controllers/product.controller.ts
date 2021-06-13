const productDAOCont = require('../daos/product.dao.ts');

exports.create = (req, res) => {
  if( 
    !req.body.department || 
    !req.body.category || 
    !req.body.title || 
    !req.body.styleNo || 
    !req.body.color ||
    !req.body.price ||
    !req.body.fabricDetails ||
    !req.body.washDetails ||
    !req.body.description ||
    !req.body.sizes ||
    !req.body.quantity
    ){
    return res.status(400).send({
      message : "All field are required"
    })
  }
  const product = new productDAOCont({
    department : req.body.department,
    category : req.body.category,
    title : req.body.title,
    styleNo : req.body.styleNo,
    color : req.body.color,
    price : req.body.price,
    fabricDetails : req.body.fabricDetails,
    washDetails : req.body.washDetails,
    description : req.body.description,
    sizes : req.body.sizes,
    quantity : req.body.quantity
  })

  product.save()
    .then((data) => {
      if(data) {
        res.send({
          type: "success",
          message : "Product Added Successfully"
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        type: 'error',
        message : err.message || "some error occured"
      })
    })
}

exports.findAll = (req, res) => {
  productDAOCont.find()
    .then((data) => {
      if (!data)
        res.status(404).send({
          type: 'error',
          message : 'No Record Found'
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ 
          type: "error",
          message: err.message
        });
    });
}

exports.findOne = (req, res) => {
  productDAOCont.findOne({styleNo: req.params.styleNo})
    .then((data)  => {
      if (!data)
        res.status(404).send({
          type: 'error',
        });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ 
        type: "error",
        message: err.message
      })
    });
}

exports.addToCart = (req, res) => {
  const data = {
    productId : req.body.productId,
    styleNo : req.body.styleNo,
    orderType : req.body.orderType
  }
  productDAOCont.addToCart(data)
  .then((data) => {
    if(!data)
      res.status(404).send({
        type: 'error',
      })
    else res.send(data)  
  })
  .catch(err => {
    res.status(500).send({
      type: 'error',
      message: err.message
    })
  })
}
