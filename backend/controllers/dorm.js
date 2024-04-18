const mongoose = require('mongoose');
const Dorm = require('../handlers/dorm');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addDorm = async (req, res) => {

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

    const NewDorm = {
        dorm_name: body.dorm_name,
        dorm_details: body.dorm_details,
        dorm_manager_id: body.dorm_manager_id,
        dorm_manager_name: body.dorm_manager_name,
        dorm_manager_contact_number: body.dorm_manager_contact_number,
        dorm_attendant_name: body.dorm_attendant_name,
        dorm_attendant_email: body.dorm_attendant_email,
        dorm_attendant_contact_number: body.dorm_attendant_contact_number
    };
    try {
        const existing = await Dorm.getOne({dorm_name: Dorm.dorm_name})
        if(existing){
            return res.status(400).send({ message: "Dorm already exists" })
        }
    }
    catch(err) {
        console.log(`Unable to find dorm. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new dorm" })
    }

    try {
        const dorm = await Dorm.create(newDorm);
        await UserLog.create(token.user, 'create', `dorm ${dorm._id}`)
        console.log(`New dorm: \n ${dorm}`);
        return res.status(201).send({ message: 'New dorm successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new dorm. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new dorm" })
    }

}

exports.editDorm = async (req, res) => {
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
    console.log(`dorm id: ${req.params.id}`)

    const dorm = {
        id: req.params.id,
        dorm_name: body.dorm_name,
        dorm_details: body.dorm_details,
        dorm_manager_id: body.dorm_manager_id,
        dorm_manager_name: body.dorm_manager_name,
        dorm_manager_contact_number: body.dorm_manager_contact_number,
        dorm_attendant_name: body.dorm_attendant_name,
        dorm_attendant_email: body.dorm_attendant_email,
        dorm_attendant_contact_number: body.dorm_attendant_contact_number
    };

    try{
        mongoose.Types.ObjectId(dorm.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Dorm.getOne({_id: dorm.id});
        if (!existing) {
            console.log("Dorm not found")
            return res.status(404).send({ message: 'Dorm not found' });
        }
    }
    catch(err){
        console.log(`Error looking for dorm in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for dorm in database' })
    }

    try{
        const edit = await Dorm.edit(dorm)
        await UserLog.create(token.user, 'edit', `dorm ${edit._id}`)
        console.log(`Edited dorm ${edit}`)
        return res.status(200).send({ message: 'Dorm successfully edited' })
    }
    catch{
        console.log(`Unable to edit dorm. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing dorm' })
    }

}