var bcrypt = require('bcryptjs');
const sessionDAOCont = require('../daos/user.dao.ts');

exports.create = (req, res) => {
  if( !req.body.userEmail || !req.body.userPassword || !req.body.fullName || !req.body.businessName ){
    return res.status(400).send({
      message : "All field are required"
    })
  }
  const session = new sessionDAOCont({
    userEmail : req.body.userEmail,
    userPassword : bcrypt.hashSync(req.body.userPassword, 10),
    fullName : req.body.fullName,
    businessName : req.body.businessName
  })

  session.save()
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
  sessionDAOCont.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((session) => {
    if(!session) {
      return res.status(404).send({
        type: "error",
        message : "No User Found"
      })
    }
    res.status(200).send(session);
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the user"
    })
  })
}

exports.findOne = (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  sessionDAOCont.findOne({'email' : email, 'password' : password})
    .then((data)  => {
      if (!data)
        res.status(404).send({ 
          type: "error",
          message: "User Not Found"
        });
      else res.status(200).send({
        data : {
          fullName : data.fullName,
          businessName : data.businessName
        },
        type : 'success',
        message : 'User/password exists'
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Invalid credentials" });
    });
};

exports.findAll = (req, res) => {
  sessionDAOCont.find()
    .then((data)  => {
      if (!data)
        res.status(404).send({ message: "Success"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Invalid credentials" });
    });
};

exports.delete = (req, res) => {
  sessionDAOCont.deleteOne({email: req.body.email})
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
