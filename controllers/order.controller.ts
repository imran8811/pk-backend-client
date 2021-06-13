var bcrypt = require('bcryptjs');
const orderDAOCont = require('../daos/order.dao.ts');

exports.create = (req, res) => {
  if( !req.body.orderQuantity || !req.body.shippingAddress ){
    return res.status(400).send({
      message : "Quantity and shipping address is required"
    })
  }
  const order = new orderDAOCont({
    orderQuantity : req.body.orderQuantity,
    shippingAddress : req.body.shippingAddress,
    whatsappNo : req.body.whatsappNo
  })

  order.save()
    .then((data) => {
      if(data) {
        res.send({
          type: "success",
          message : "Order added Successfully"
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message : err.message || "some error occured"
      })
    })
}

exports.update = (req, res) => {
  orderDAOCont.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((order) => {
    if(!order) {
      return res.status(404).send({
        type: "error",
        message : "No order Found"
      })
    }
    res.status(200).send(order);
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the order"
    })
  })
}

exports.findOne = (req, res) => {
  orderDAOCont.findOne({orderEmail: req.body.email})
    .then(async(data)  => {
      if(await bcrypt.compare(req.body.password, data.orderPassword)){
        res.status(200).send({
          data : {
            fullName : data.fullName,
            businessName : data.businessName
          },
          type : 'success',
          message : 'Logged in'
        });
      } else {
        res.status(200).send({
          type: "error",
          message: "Invalid Credentials"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        type: "error",
        message: "order not found"
      });
    });
};

exports.findAll = (req, res) => {
  orderDAOCont.find()
    .then((data)  => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Invalid credentials" });
    });
};

exports.delete = (req, res) => {
  orderDAOCont.deleteOne({email: req.body.email})
  .then((data) => {
    if(data.deletedCount === 0) {
      return res.status(404).send({
        errorCode : "420",
        message : "No order Found"
      })
    } else {
      res.status(200).send({
        type: "success",
        message : 'order deleted successfully'
      });
    }
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the order"
    })
  })
}
