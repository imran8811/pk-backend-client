const cartDAOCont = require('../daos/cart.dao.ts');

exports.create = (req, res) => {
  if( 
    !req.body.productId || 
    !req.body.styleNo || 
    !req.body.sizes || 
    !req.body.quantity || 
    !req.body.orderType
    ){
    return res.status(400).send({
      message : "All field are required"
    })
  }
  const cart = new cartDAOCont({
    productId : req.body.productId,
    styleNo : req.body.styleNo,
    sizes : req.body.sizes,
    quantity : req.body.quantity,
    orderType : req.body.orderType
  })

  cart.save()
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
  cartDAOCont.find()
  .then((data)  => {
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
  cartDAOCont.findOne({_id: req.params.id})
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
