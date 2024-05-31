const mongoose = require('mongoose');
const Attendant = require('../handlers/attendant');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addAttendant = async (req, res) => {
    const body = req.body;

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    // console.log("here");
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    const newAttendant = {
        user_id: body.user_id,
        role: body.role,
        dorm: body.dorm,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        picture_url: body.picture_url
    };

    try{
        const existing = await Attendant.getOne({email: newAttendant.email})
        if(existing){
            return res.status(400).send({ message: "Attendant already exists" })
        }
    }
    catch(err){
        console.log(`Unable to find attendant. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new attendant" })
    }

    try {
        const attendant = await Attendant.create(newAttendant);
        await UserLog.create(token.user, 'create', `attendant ${attendant._id}`)
        console.log(`New attendant: \n ${attendant}`);
        return res.status(201).send({ message: 'New attendant successfully added' , success: true });
    }
    catch(err) {
        console.log(`Unable to create new attendant. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new attendant" })
    }

}

exports.editAttendant = async (req, res) => {

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
    console.log(`attendant id: ${req.params.id}`)

    const attendant = {
        id: req.params.id,
        user_id: body.user_id,
        role: body.role,
        dorm: body.dorm,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        picture_url: body.picture_url
    };

    try{
        mongoose.Types.ObjectId(attendant.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Attendant.getOne({_id: attendant.id});
        if (!existing) {
            console.log("Attendant not found")
            return res.status(404).send({ message: 'Attendant not found' });
        }
    }
    catch(err){
        console.log(`Error looking for attendant in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for attendant in database' })
    }

    try{
        const edit = await Attendant.edit(attendant)
        await UserLog.create(token.user, 'edit', `attendant ${edit._id}`)
        console.log(`Edited attendant ${edit}`)
        return res.status(200).send({ message: 'Attendant successfully edited' })
    }
    catch(err){
        console.log(`Unable to edit attendant. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing attendant' })
    }

}

exports.deleteAttendant = async (req, res) => {
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
    catch(err){
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
        
    
            let attendant = null;
            try{
                attendant = await Attendant.getOne({_id: idList[i]});  //call to handler here
                //console.log(attendant);
                if(attendant){
                    await Delete.create("attendant", attendant);
                    await UserLog.create(token.user, 'delete', `attendant ${attendant._id}`)
                    await Attendant.delete({_id: idList[i]});
                    console.log('Successfully deleted attendant with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid attendant id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for attendant in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for attendant'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} attendant`});
            return;
        }else{
            res.status(201).send({body: invalidId , message: `Successfully deleted ${deleted} attendant/s but failed to delete ${failed} attendant/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting attendants ${err}`);
        res.status(500).send({ message: 'Error deleting attendants'});
        return;
    }
}

exports.findAttendant = async (req, res) => {
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


    console.log(`attendant id: ${req.params.id}`)
    const id = req.params.id;
    let attendant;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        attendant = await Attendant.getOne({_id: id})
        if(!attendant){
            console.log("Attendant not found")
            return res.status(404).send({message: `attendant not found`})
        }
        else{
            //console.log(attendant)
            return res.status(200).send(attendant)
        }
    }
    catch(err){
        console.log(`Error searching for attendant in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for attendant'})
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

    let attendant;
    try{
        attendant = await Attendant.getAll()
        if(!attendant){
            console.log("Attendant database is empty")
            return res.status(404).send({message: `No attendant in database`})
        }
        else{
            //console.log(attendant)
            return res.status(200).send(attendant)
        }
    }
    catch(err){
        console.log(`Error searching for attendant in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for attendant'})
    }
}

exports.searchAttendant = async (req, res) => {

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

    let search = req.query.name
    let result = new Array;

    try{
        if(search == ''){
            return res.status(200).send({result})
        }
        let attendant = await Attendant.getAll()
        if(!attendant){
            console.log("Attendant database is empty")
            return res.status(400).send({message: `No attendant in database`})
        }
        else{
            search = search.toLowerCase()
            for(let i = 0; i < attendant.length; i++){
                const fname = attendant[i].first_name.toLowerCase()
                const mname = attendant[i].middle_name.toLowerCase()
                const lname = attendant[i].last_name.toLowerCase()
                if(fname.match(search) || lname.match(search) || mname.match(search)){
                    result.push(attendant[i])
                }
            }
            return res.status(200).send({result})
        }
    }
    catch(err){
        console.log(`Error searching for attendant in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for attendant'})
    }

}