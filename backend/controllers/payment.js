const mongoose = require('mongoose');
const Payment = require('../handlers/payment');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addPayment = async (req, res) => {
    const body = req.body;

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    const newPayment = {
        term: body.term,
        period_covered: body.period_covered,
        or_number: body.or_number,
        dorm_fee: body.dorm_fee,
        appliances_fee: body.appliances_fee,
        date_paid: body.date_paid,
        resident_id: body.resident_id,
        committed_by: body.committed_by
    }

    try {
        const payment = await Payment.create(newPayment);
        await UserLog.create(token.user, 'create', `payment ${payment._id}`)
        console.log(`New payment: \n ${payment}`);
        return res.status(201).send({ message: 'New payment successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new payment. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new payment" })
    }
}

exports.editPayment = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    const body = req.body;
    console.log(`payment id: ${req.params.id}`)

    const payment = {
        id: req.params.id,
        term: body.term,
        period_covered: body.period_covered,
        or_number: body.or_number,
        dorm_fee: body.dorm_fee,
        appliances_fee: body.appliances_fee,
        date_paid: body.date_paid,
        resident_id: body.resident_id,
        committed_by: body.committed_by
    };

    try{
        mongoose.Types.ObjectId(payment.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Payment.getOne({_id: payment.id});
        if (!existing) {
            console.log("Payment not found")
            return res.status(404).send({ message: 'Payment not found' });
        }
    }
    catch(err){
        console.log(`Error looking for payment in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for payment in database' })
    }

    try{
        const edit = await Payment.edit(payment)
        await UserLog.create(token.user, 'edit', `payment ${edit._id}`)
        console.log(`Edited payment ${edit}`)
        return res.status(200).send({ message: 'payment successfully edited' })
    }
    catch{
        console.log(`Unable to edit payment. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing payment' })
    }
}

exports.deletePayment = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }


    const idList = req.body.ids;
    let deleted = 0, failed = 0;
    let invalidId = new Array;
    let validId = new Array;

    try{
        var reqLength = idList.length;
    }
    catch{
    console.log('Invalid property');
    res.status(501).send({ message: 'Invalid property'});
    }

    try{
        for(let i = 0; i < reqLength; i++){
            try{
                mongoose.Types.ObjectId(idList[i]);
            }
            catch(err){
                console.log('Wrong format:', idList[i]);
                invalidId[failed] = idList[i];
                failed++;
                continue;
            }
        
    
            let payment = null;
            try{
                payment = await Payment.getOne({_id: idList[i]});  //call to handler here
                //console.log(manager);
                if(payment){
                    await Delete.create("payment", payment);
                    await UserLog.create(token.user, 'delete', `payment ${payment._id}`)
                    await Payment.delete({_id: idList[i]});
                    console.log('Successfully deleted payment with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid payment id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for payment in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for payment'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} payment`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} payment/s but failed to delete ${failed} payment/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting payments ${err}`);
        res.status(500).send({ message: 'Error deleting payments'});
        return;
    }
}


exports.findPayment = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }


    console.log(`payment id: ${req.params.id}`)
    const id = req.params.id;
    let payment;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        payment = await Payment.getOne({_id: id})
        if(!payment){
            console.log("Payment not found")
            return res.status(404).send({message: `payment not found`})
        }
        else{
            return res.status(200).send(payment)
        }
    }
    catch(err){
        console.log(`Error searching for payment in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for payment'})
    }
}

exports.findAll = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    let payment;
    try{
        payment = await Payment.getAll()
        if(!payment){
            console.log("Payment database is empty")
            return res.status(404).send({message: `No payment in database`})
        }
        else{
            return res.status(200).send(payment)
        }
    }
    catch(err){
        console.log(`Error searching for payment in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for payment'})
    }
} 