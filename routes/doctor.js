const express = require("express");
const connection = require("../connection");
const { authenticateToken } = require('../services/authentication');
const router = express.Router();
var checkRole = require('../services/checkRole');

const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require("dotenv").config();
var auth = require('../services/authentication');

router.post('/signup', (req, res) => {
    let doctor = req.body;
    query = "select email,password,status from doctor where email=?";
    connection.query(query, [doctor.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query =
                    "insert into doctor(name,description,contactNumber,email,password,branchId,categoryId,productId,status) values(?,?,?,?,?,?,?,?,'false')";
                connection.query(
                    query,
                    [doctor.name,doctor.description,doctor.contactNumber,doctor.email,doctor.password,doctor.branchId,doctor.categoryId,doctor.productId],
                    (err, results) => {
                        if (!err) {
                            return res
                                .status(200)
                                .json({ message: "Successfully registered" });
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
    const doctor = req.body;
    //console.log(doctor);
    query = "select email,password,role,status from doctor where email=?";
    connection.query(query, [doctor.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != doctor.password) {
                return res
                    .status(401)
                    .json({ message: "Incorrect Username or Password" });
            } else if (results[0].status === "false") {
                return res.status(401).json({ message: "Wait for admin approval" });
            } else if (results[0].password == doctor.password) {
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
    const doctor = req.body;
    query = "select email,password from doctor where email=?";
    connection.query(query,[doctor.email],(err,results)=>{
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
                    html: '<p><b>Your Login details for ClinicX Hospital System</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href=" http://localhost:4200">Click here to login</a></p>'
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

router.get('/get',auth.authenticateToken,(req,res)=>{
    var query = "select * from doctor";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getDoctorsByBranch/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name,categoryId,productId,branchId from doctor where branchId=? and status='true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getDoctorsBranch',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select doctor.name, doctor.description, doctor.contactNumber, doctor.email, doctor.password, doctor.branchId, doctor.categoryId, doctor.productId from doctor, branch where branch.id = doctor.branchId and branch.email=?";
    connection.query(query,[res.locals.email],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getDoctorsByProduct/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name,branchId from doctor where productId=? and status='true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name,description,contactNumber,email from doctor where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,(req,res)=>{
    let doctor = req.body;
    var query = "update doctor set status=? where id=?";
    connection.query(query,[doctor.status,doctor.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Doctor ID does not exist"});
            }
            return res.status(200).json({message: "Doctor updated successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})

router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const doctor = req.body;
    const email = res.locals.email;
    var query = "select * from doctor where email=? and password=?";
    connection.query(query,[email,doctor.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                return res.status(400).json({message:"Incorrect Old Password"});
            }else if(results[0].password == doctor.oldPassword){
                query = "update doctor set password=? where email=?";
                connection.query(query,[doctor.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Password updated successfully"});
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

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from doctor where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Doctor id does not exist"});
            }
            return res.status(200).json({message:"Doctor deleted"});
        }else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
