const User = require("../Models/userModel");
var moment = require("moment");
var connection  = require('../lib/db');
exports.addUser = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "Cannot sent empty fields for signup!"
      });
    }
    
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.fullName,
      phone:req.body.phoneNumber
      });

    User.addUser(user, (err, data) => {
      if (err) {
       return res.status(500).send({
          message: err.message || "Some error occurred while adding vet user."
        });
      }else {
        if(data.message == "Available"){
          return res.status(409).send({
            code: 409,
            message: "Email already exists",
          });
        }else if(data.message == "not added"){
          return res.status(403).send({
            code: 403,
            message: "user not added",
          });
        }
        else if(data.message == "Added"){
          return res.status(200).send({
            code: 200,
            message: "user added",
          });
        }
      }
    });
  }




// Retrieve new user from the database.
exports.findNew = (req, res) => {
    User.getNew((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            }
        } else res.send({ code: 200, message: `user was deleted successfully!` });
    });
};

// Retrieve new user from the database.
exports.userDetails = (req, res) => {
    User.userDetails(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
