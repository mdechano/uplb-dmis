const mongoose = require('mongoose');
const Receipt = require('../handlers/receipt');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addReceipt = async (req, res) => {
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

    const newReceipt = {
        date_posted: body.date_posted,
        academic_year: body.academic_year,
        semester: body.semester,
        months_covered: body.months_covered,
        resident_id: body.resident_id, // id of resident who posted
        pdf_url: body.pdf_url
    }

    try {
        const receipt = await Receipt.create(newReceipt);
        await UserLog.create(token.user, 'create', `receipt ${receipt._id}`)
        console.log(`New receipt: \n ${receipt}`);
        return res.status(201).send({ message: 'New receipt successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new receipt. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new receipt" })
    }
}

exports.editReceipt = async (req, res) => {
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
    console.log(`receipt id: ${req.params.id}`)

    const receipt = {
        id: req.params.id,
        date_posted: body.date_posted,
        academic_year: body.academic_year,
        semester: body.semester,
        months_covered: body.months_covered,
        resident_id: body.resident_id, // id of resident who posted
        pdf_url: body.pdf_url
    };

    try{
        mongoose.Types.ObjectId(receipt.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Receipt.getOne({_id: receipt.id});
        if (!existing) {
            console.log("Receipt not found")
            return res.status(404).send({ message: 'Receipt not found' });
        }
    }
    catch(err){
        console.log(`Error looking for receipt in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for receipt in database' })
    }

    try{
        const edit = await Receipt.edit(receipt)
        await UserLog.create(token.user, 'edit', `receipt ${edit._id}`)
        console.log(`Edited receipt ${edit}`)
        return res.status(200).send({ message: 'Receipt successfully edited' })
    }
    catch(err){
        console.log(`Unable to edit receipt. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing receipt' })
    }
}

exports.deleteReceipt = async (req, res) => {
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
        
    
            let receipt = null;
            try{
                receipt = await Receipt.getOne({_id: idList[i]});  //call to handler here
                //console.log(manager);
                if(receipt){
                    await Delete.create("receipt", receipt);
                    await UserLog.create(token.user, 'delete', `receipt ${receipt._id}`)
                    await Receipt.delete({_id: idList[i]});
                    console.log('Successfully deleted receipt with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid receipt id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for receipt in the DB ${err}` );
                return res.status(500).send({message: 'Error receipt for receipt'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} receipt`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} receipt/s but failed to delete ${failed} receipt/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting receipts ${err}`);
        res.status(500).send({ message: 'Error deleting receipts'});
        return;
    }
}


exports.findReceipt = async (req, res) => {
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


    console.log(`receipt id: ${req.params.id}`)
    const id = req.params.id;
    let receipt;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        receipt = await Receipt.getOne({_id: id})
        if(!receipt){
            console.log("Receipt not found")
            return res.status(404).send({message: `receipt not found`})
        }
        else{
            return res.status(200).send(receipt)
        }
    }
    catch(err){
        console.log(`Error searching for receipt in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for receipt'})
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

    let receipt;
    try{
        receipt = await Receipt.getAll()
        if(!receipt){
            console.log("Receipt database is empty")
            return res.status(404).send({message: `No receipt in database`})
        }
        else{
            return res.status(200).send(receipt)
        }
    }
    catch(err){
        console.log(`Error searching for receipt in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for receipt'})
    }
} 