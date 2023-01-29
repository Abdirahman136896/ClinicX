const express = require('express');
const connection = require('../connection');
const { authenticateToken } = require('../services/authentication');
const router = express.Router();
const jwt = require("jsonwebtoken");
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
const nodemailer = require('nodemailer');

router.post('/signup', (req, res) => {
    let branch = req.body;
    query = "select email,password,role,status from branch where email=?";
    connection.query(query, [branch.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query =
                    "insert into branch(name,location,contactNumber,email,password,status,role) values(?,?,?,?,?,'true',?)";
                connection.query(
                    query,
                    [branch.name,branch.location,branch.contactNumber,branch.email,branch.password,branch.role],
                    (err, results) => {
                        if (!err) {
                            return res
                                .status(200)
                                .json({ message: "Successfully registered branch" });
                        } else {
                            return res.status(500).json(err);
                        }
                    }
                );
            } else {
                return res.status(400).json({ message: "Email Already Exists" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post('/login', (req, res) => {
    const branch = req.body;
    query = "select email,password,role,status from branch where email=?";
    connection.query(query, [branch.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != branch.password) {
                return res
                    .status(401)
                    .json({ message: "Incorrect Username or Password" });
            } else if (results[0].status === "false") {
                return res.status(401).json({ message: "Wait for admin approval" });
            } else if (results[0].password == branch.password) {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: "8h"
                });
                res.status(200).json({ token: accessToken });
            } else {
                return res
                    .status(400)
                    .json({ message: "Something went wrong please try again later" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

var transporter = nodemailer.createTransport({
    //service: 'gmail',
    service : process.env.EMAIL_SERVICE,
    auth:{
        /*user: process.env.EMAIL,
        pass: process.env.PASSWORD*/
        user: process.env.EMAIL_USERNAME,
        pass : process.env.EMAIL_PASSWORD
    }
})

router.post('/forgotpassword',(req,res) =>{
    const branch = req.body;
    query = "select email,password from branch where email=?";
    connection.query(query,[branch.email],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(200).json({message:"The email entered is invalid"});
                console.log("The email entered is invalid");
            }else{
                var mailOptions = {
                    //from: process.env.EMAIL,
                    from : process.env.EMAIL_FROM,
                    to: results[0].email,
                    subject: 'Reset Password',
                    html: '<p><b>Your Branch Login details for ClinicX Hospital System</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href=" http://localhost:4200">Click here to login</a></p>'
                };
                transporter.sendMail(mailOptions,function(err,info){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Email Sent: '+info.response);
                    }
                });
                return res.status(200).json({message: "Password sent to your email address"});
            }
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "select * from branch order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/updatebranchdetails',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let branch = req.body;
    var query = "update branch set name=?,location=?,contactNumber=? where id=?";
    connection.query(query,[branch.name,branch.location,branch.contactNumber,branch.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Branch id does not exist"});
            }
            return res.status(200).json({message:"Branch updated succesfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let branch = req.body;
    var query = "update branch set status=? where id=?";
    connection.query(query,[branch.status,branch.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Branch ID does not exist"});
            }
            return res.status(200).json({message: "Branch updated successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})

router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const branch = req.body;
    const email = res.locals.email;
    var query = "select * from branch where email=? and password=?";
    connection.query(query,[email,branch.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message:"Incorrect Old Password"});
            }else if(results[0].password == branch.oldPassword){
                query = "update branch set password=? where email=?";
                connection.query(query,[branch.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Branch Password updated successfully"});
                    }else{
                        return res.status(500).json(err);
                    }
                })
            }else{
                return res.status(400).json({message: "Something went wrong please try again later"});
            }
        }else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;