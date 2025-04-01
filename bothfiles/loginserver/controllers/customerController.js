

const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const  secretKey = process.env.WhatIsYourName ;

const customerRegister = async(req , res )=>{
    const {Name , email , password} = req.body ;
    try {
        console.log("received data :" , req.body);

        if (!Name || !email || !password) {
            return res.status(400).json({error:"all fields are required"});
        }

        const existingCustomer = await Customer.findOne({email});
        if (existingCustomer) {
            return res.status(400).json({error:"email already exists!!!"})
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const newCustomer = new Customer({
            Name,
            email,
            password:hashedPassword
        });

        await newCustomer.save();
        res.status(201).json({message:"customer registered successfully!!!"});
        
    } catch (error) {
        console.error("error during customer registration" , error);
        res.status(500).json({error:"internal server error "});
    }
};


const customerLogin = async(req , res)=>{
    const {email , password} = req.body ;
    try {
        const customer  = await  Customer.findOne({email});
        if(!customer || ! (await bcrypt.compare(password , customer.password))){
            return res.status(401).json({error:"invalide email or password"});
        }

        const token = jwt.sign({customerId : customer._id} , secretKey , {expiresIn:"1h"});

        res.status(200).json({
            success:"login successfully ",
            token ,
            customer:{
                id:customer._id,
                Name:customer.Name,
                email:customer.email
            }
        });

        console.log(email , "token generated " , token );

    } catch (error) {
        console.error("error during customer login");
        res.status(500).json({message:"internal server error "})
    }
};


module.exports={customerRegister , customerLogin}
