const User = require('../models/userSchema')

const user_post_login = (mreq, mres) => {

    User.findOne({ Email: mreq.body.Email })
      .then((res_user) => {
  
        if (res_user.Password == mreq.body.Password) {
          //Verified
          //TODO here we should decrypt and compare
          mres.json(res_user);
        } else {
          //Password is not correct
          mres.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log("Login Error", err);
        mres.sendStatus(404);
      });
  }

const user_post_register =(mreq, mres) => {
    //TODO encrypt the password
    //TODO another verification
  
    let user = new User(mreq.body);
    user
      .save()
      .then(() => {
        mres.sendStatus(200);
      })
      .catch((error) => {
        console.log("%c Error in saving data in mongo" + error, "color: red;");
      });
  }

  const user_post_forgotten = (mreq, mres) => {
    User.find({ Email: mreq.body.email })
      .then((res_user) => {
        //TODO for password verification
        //Send Email for his gmail with random verification code
        //compare the code he wrote with the code you send
        //is they are the same voala open the password
      })
      .catch((err) => mres.sendStatus(404));
  }


//   -------------------- IDS
const user_get_id = (mreq, mres) => {
    User.findById(mreq.params.id).then((res_user) => mres.json(res_user));
  }
const user_put_id = (mreq,mres)=>{
    User.findByIdAndUpdate(mreq.params.id,mreq.body,function(err,docs){
      if(err){
        console.log(err);
        mres.sendStatus(404);
      }
      else{
        mres.sendStatus(200);
      }
    })
  }
const user_delete_id = (mreq, mres) => {
    User.findByIdAndDelete(mreq.params.id, function (err, docs) {
      if (err) {
        console.log(err);
        mres.sendStatus(404);
      } else {
        mres.sendStatus(200);
      }
    }).catch((err) => {
      console.log("Error delete", err);
      mres.sendStatus(404);
    });
  }

//   ---------------- General
const users_get = (mreq, mres) => {
  User.find().then((result) => mres.json(result));
}

module.exports = {
    user_post_login,
    user_post_register,
    user_post_forgotten,
    user_get_id,
    user_put_id,
    user_delete_id,
    users_get
}