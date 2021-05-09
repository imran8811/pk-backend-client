var bcrypt = require('bcryptjs');
const userDAOCont = require('../daos/user.dao.ts');

exports.create = (req, res) => {
  if( !req.body.userEmail || !req.body.userPassword || !req.body.fullName || !req.body.businessName ){
    return res.status(400).send({
      message : "All field are required"
    })
  }
  const user = new userDAOCont({
    userEmail : req.body.userEmail,
    userPassword : bcrypt.hashSync(req.body.userPassword, 10),
    fullName : req.body.fullName,
    businessName : req.body.businessName
  })

  user.save()
    .then((data) => {
      if(data) {
        res.send({
          type: "success",
          message : "User Registered Successfully"
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
  userDAOCont.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((user) => {
    if(!user) {
      return res.status(404).send({
        type: "error",
        message : "No User Found"
      })
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the user"
    })
  })
}

exports.findOne = (req, res) => {
  userDAOCont.findOne({userEmail: req.body.email})
    .then(async(data)  => {
      if(await bcrypt.compare(req.body.password, data.userPassword)){
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
        message: "user not found"
      });
    });
};

exports.findAll = (req, res) => {
  userDAOCont.find()
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
  userDAOCont.deleteOne({email: req.body.email})
  .then((data) => {
    if(data.deletedCount === 0) {
      return res.status(404).send({
        errorCode : "420",
        message : "No User Found"
      })
    } else {
      res.status(200).send({
        type: "success",
        message : 'user deleted successfully'
      });
    }
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the user"
    })
  })
}
