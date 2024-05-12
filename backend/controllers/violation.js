const mongoose = require('mongoose');
const Violation = require('../handlers/violation');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addViolation = async (req, res) => {
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

    const newViolation = {
        date: body.date,
        time: body.time,
        nature: body.nature,
        remarks: body.remarks,
        resident_id: body.resident_id,
        committed_by: body.committed_by
    }

    try {
        const violation = await Violation.create(newViolation);
        await UserLog.create(token.user, 'create', `manager ${violation._id}`)
        console.log(`New violation: \n ${violation}`);
        return res.status(201).send({ message: 'New violation successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new violation. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new violation" })
    }
}

exports.editViolation = async (req, res) => {
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
    console.log(`violation id: ${req.params.id}`)

    const violation = {
        id: req.params.id,
        date: body.date,
        time: body.time,
        nature: body.nature,
        remarks: body.remarks,
        resident_id: body.resident_id,
        committed_by: body.committed_by
    };

    try{
        mongoose.Types.ObjectId(violation.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Violation.getOne({_id: violation.id});
        if (!existing) {
            console.log("Violation not found")
            return res.status(404).send({ message: 'Violation not found' });
        }
    }
    catch(err){
        console.log(`Error looking for violation in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for violation in database' })
    }

    try{
        const edit = await Violation.edit(violation)
        await UserLog.create(token.user, 'edit', `violation ${edit._id}`)
        console.log(`Edited violation ${edit}`)
        return res.status(200).send({ message: 'Violation successfully edited' })
    }
    catch{
        console.log(`Unable to edit violation. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing violation' })
    }
}

exports.deleteViolation = async (req, res) => {
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
        
    
            let violation = null;
            try{
                violation = await Violation.getOne({_id: idList[i]});  //call to handler here
                //console.log(manager);
                if(violation){
                    await Delete.create("violation", violation);
                    await UserLog.create(token.user, 'delete', `violation ${violation._id}`)
                    await Violation.delete({_id: idList[i]});
                    console.log('Successfully deleted violation with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid violation id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for violation in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for violation'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} violation`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} violation/s but failed to delete ${failed} violation/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting violations ${err}`);
        res.status(500).send({ message: 'Error deleting violations'});
        return;
    }
}


exports.findViolation = async (req, res) => {
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


    console.log(`violation id: ${req.params.id}`)
    const id = req.params.id;
    let violation;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        violation = await Violation.getOne({_id: id})
        if(!violation){
            console.log("Violation not found")
            return res.status(404).send({message: `violation not found`})
        }
        else{
            return res.status(200).send(violation)
        }
    }
    catch(err){
        console.log(`Error searching for violation in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for violation'})
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

    let violation;
    try{
        violation = await Violation.getAll()
        if(!violation){
            console.log("Violation database is empty")
            return res.status(404).send({message: `No violation in database`})
        }
        else{
            return res.status(200).send(violation)
        }
    }
    catch(err){
        console.log(`Error searching for violation in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for violation'})
    }
} 