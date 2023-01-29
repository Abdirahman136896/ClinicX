const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

router.post('/generateReport',auth.authenticateToken,(req,res)=>{
    const generateUuid = uuid.v1();
    const orderDetails = req.body;
    console.log(orderDetails.branch.name);
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    var doctorDetailsReport = JSON.parse(orderDetails.doctorDetails);

    var query = "insert into bill (name,uuid,email,contactNumber,paymentMethod,total,productDetails,doctorDetails,createdBy,branch) values(?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[orderDetails.name,generateUuid,orderDetails.email,orderDetails.contactNumber,orderDetails.paymentMethod,orderDetails.totalAmount,orderDetails.productDetails,orderDetails.doctorDetails,res.locals.email,orderDetails.branch.name],(err,results)=>{
        if(!err){
            ejs.renderFile(path.join(__dirname,'',"report.ejs"),{doctorDetails:doctorDetailsReport,productDetails:productDetailsReport,name:orderDetails.name,email:orderDetails.email,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount},(err,results)=>{
                if(err){
                    return res.status(500).json(err);
                }else{
                    pdf.create(results).toFile('./generated_pdf/'+generateUuid+".pdf",function(err,data){
                        if(err){
                            console.log(err);
                            return res.status(500).json(err)
                        }else{
                            return res.status(200).json({ uuid: generateUuid })
                        }
                    })
                }
            })
        }else{
            return res.status(500).json(err);
        }
    });
})

router.post('/getPdf',auth.authenticateToken,(req,res)=>{
    const orderDetails = req.body;
    const pdfPath = './generated_pdf/'+orderDetails.uuid+'.pdf';
    if(fs.existsSync(pdfPath)){
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    }else{
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails:productDetailsReport,name:orderDetails.name,email:orderDetails.email,contactNumber:orderDetails.contactNumber,paymentMethod:orderDetails.paymentMethod,totalAmount:orderDetails.totalAmount},(err,results)=>{
            if(err){
                return res.status(500).json(err);
            }else{
                pdf.create(results).toFile('./generated_pdf/'+orderDetails.uuid+".pdf",function(err,data){
                    if(err){
                        console.log(err);
                        return res.status(500).json(err)
                    }else{
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        })
    }
})

router.get('/getBills',auth.authenticateToken,(req,res,next)=>{
    var query = "select * from bill order by id DESC";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get("/table/:startDate/:endDate", (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    //console.log(startDate);
    //console.log(endDate);

    var stdate = new Date(startDate);

    // Get year, month, and day part from the date
    var year = stdate.toLocaleString("default", { year: "numeric" });
    var month = stdate.toLocaleString("default", { month: "2-digit" });
    var day = stdate.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedStDate = year + "-" + month + "-" + day;
    //console.log(formattedStDate);
    var endate = new Date(endDate);

    // Get year, month, and day part from the date
    var year = endate.toLocaleString("default", { year: "numeric" });
    var month = endate.toLocaleString("default", { month: "2-digit" });
    var day = endate.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedEnDate = year + "-" + month + "-" + day;
    //console.log(formattedEnDate);
    const query = `SELECT * FROM bill WHERE createdAt BETWEEN '${formattedStDate}' AND '${formattedEnDate}'`;
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
});

router.get('/getBillsByBranch',auth.authenticateToken,(req,res,next)=>{
    //console.log(res.locals.email);
    var query = "select * from branch where branch.email=? and status='true'";
    connection.query(query,[res.locals.email],(err,result)=>{
        if(!err){
            //console.log(result);
            var query = "select * from bill where branch=?";
            connection.query(query,[result[0].name],(err,results)=>{
                if(!err){
                    return res.status(200).json(results);
                }else{
                    return res.status(500).json(err);
                }
            })
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getBillsByDoctor',auth.authenticateToken,(req,res,next)=>{
    //console.log(res.locals.email);
    var query = "select * from doctor where doctor.email=? and status='true'";
    connection.query(query,[res.locals.email],(err,result)=>{
        if(!err){
            //console.log(result);
            var query = "select * from bill where JSON_EXTRACT(doctorDetails, '$[0].doctor_email')=?";
            connection.query(query,[result[0].email],(err,results)=>{
                if(!err){
                    //console.log(results);
                    return res.status(200).json(results);
                }else{
                    return res.status(500).json(err);
                }
            })
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/branch/:startDate/:endDate',auth.authenticateToken,(req,res,next)=>{
    //console.log(res.locals.email);
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    var stdate = new Date(startDate);
    var year = stdate.toLocaleString("default", { year: "numeric" });
    var month = stdate.toLocaleString("default", { month: "2-digit" });
    var day = stdate.toLocaleString("default", { day: "2-digit" });
    var formattedStDate = year + "-" + month + "-" + day;

    var endate = new Date(endDate);
    var year = endate.toLocaleString("default", { year: "numeric" });
    var month = endate.toLocaleString("default", { month: "2-digit" });
    var day = endate.toLocaleString("default", { day: "2-digit" });
    var formattedEnDate = year + "-" + month + "-" + day;
    var query = "select * from branch where branch.email=? and status='true'";
    connection.query(query,[res.locals.email],(err,result)=>{
        if(!err){
            //console.log(result[0].name);
            var query = `SELECT * FROM bill WHERE branch=? AND (createdAt BETWEEN '${formattedStDate}' AND '${formattedEnDate}')`;
            connection.query(query,[result[0].name],(err,results)=>{
                if(!err){
                    //console.log(results);
                    return res.status(200).json(results);
                }else{
                    return res.status(500).json(err);
                }
            })
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/doctor/:startDate/:endDate',auth.authenticateToken,(req,res,next)=>{
    //console.log(res.locals.email);
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    var stdate = new Date(startDate);
    var year = stdate.toLocaleString("default", { year: "numeric" });
    var month = stdate.toLocaleString("default", { month: "2-digit" });
    var day = stdate.toLocaleString("default", { day: "2-digit" });
    var formattedStDate = year + "-" + month + "-" + day;

    var endate = new Date(endDate);
    var year = endate.toLocaleString("default", { year: "numeric" });
    var month = endate.toLocaleString("default", { month: "2-digit" });
    var day = endate.toLocaleString("default", { day: "2-digit" });
    var formattedEnDate = year + "-" + month + "-" + day;
    var query = "select * from doctor where doctor.email=? and status='true'";
    connection.query(query,[res.locals.email],(err,result)=>{
        if(!err){
            //console.log(result);
            var query = `SELECT * FROM bill WHERE JSON_EXTRACT(doctorDetails, '$[0].doctor_email')=? AND (createdAt BETWEEN '${formattedStDate}' AND '${formattedEnDate}')`;
            connection.query(query,[result[0].email],(err,results)=>{
                if(!err){
                    //console.log(results);
                    return res.status(200).json(results);
                }else{
                    return res.status(500).json(err);
                }
            })
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from bill where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Bill id does not exist"});
            }
            return res.status(200).json({message: "Bill deleted"});
        }else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;