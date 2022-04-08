const sql  = require('../lib/db');

// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.full_name = user.fullName;
  this.phone = user.phoneNumber;
};

User.addUser = (data, result) => {
  sql.query("SELECT email FROM admin_users WHERE email = ?", data.email, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }else{
      if(res.length){
        result(null, {message: 'Availabe'});
        return;
      }else{
        sql.query("INSERT INTO admin_users SET ?", data, (err, res) => {
          if (err) {
            result(null, err);
            return;
          }else{
            if (res.affectedRows == 0) {
              result(null, {message: 'not added'});
              return;
            }else{
              result(null, {message: 'Added'});
            }
          }
        });
      }
    }
  });
};

module.exports = User;
