const mongoose = require('mongoose');
const Manager = require('../handlers/manager');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addManager = async (req, res) => {
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

    const newManager = {
        user_id: body.user_id,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        picture_id: body.picture_id,
        dorm_id: body.dorm_id
    };
    try{
        const existing = await Manager.getOne({email: newManager.email})
        if(existing){
            return res.status(400).send({ message: "Manager already exists" })
        }
    }
    catch(err){
        console.log(`Unable to find manager. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new manager" })
    }

    try {
        const manager = await Manager.create(newManager);
        await UserLog.create(token.user, 'create', `manager ${manager._id}`)
        console.log(`New manager: \n ${manager}`);
        return res.status(201).send({ message: 'New manager successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new manager. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new manager" })
    }
}

exports.editManager = async (req, res) => {
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
    console.log(`manager id: ${req.params.id}`)

    const manager = {
        id: req.params.id,
        user_id: body.user_id,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        picture_id: body.picture_id,
        dorm_id: body.dorm_id
    };

    try{
        mongoose.Types.ObjectId(manager.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Resident.getOne({_id: manager.id});
        if (!existing) {
            console.log("Manager not found")
            return res.status(404).send({ message: 'Manager not found' });
        }
    }
    catch(err){
        console.log(`Error looking for manager in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for manager in database' })
    }

    try{
        const edit = await Manager.edit(manager)
        await UserLog.create(token.user, 'edit', `manager ${edit._id}`)
        console.log(`Edited manager ${edit}`)
        return res.status(200).send({ message: 'Manager successfully edited' })
    }
    catch{
        console.log(`Unable to edit manager. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing manager' })
    }
}

exports.deleteManager = async (req, res) => {
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
        
    
            let manager = null;
            try{
                manager = await Manager.getOne({_id: idList[i]});  //call to handler here
                //console.log(manager);
                if(manager){
                    await Delete.create("resident", manager);
                    await UserLog.create(token.user, 'delete', `resident ${manager._id}`)
                    await Manager.delete({_id: idList[i]});
                    console.log('Successfully deleted manager with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid manager id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for manager in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for manager'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} manager`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} manager/s but failed to delete ${failed} manager/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting managers ${err}`);
        res.status(500).send({ message: 'Error deleting managers'});
        return;
    }
}

exports.findManager = async (req, res) => {
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


    console.log(`manager id: ${req.params.id}`)
    const id = req.params.id;
    let manager;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        resident = await Resident.getOne({_id: id})
        if(!resident){
            console.log("Manager not found")
            return res.status(404).send({message: `manager not found`})
        }
        else{
            //console.log(manager)
            return res.status(200).send(manager)
        }
    }
    catch(err){
        console.log(`Error searching for manager in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for manager'})
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

    let manager;
    try{
        manager = await Manager.getAll()
        if(!manager){
            console.log("Manager database is empty")
            return res.status(404).send({message: `No manager in database`})
        }
        else{
            //console.log(manager)
            return res.status(200).send(manager)
        }
    }
    catch(err){
        console.log(`Error searching for manager in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for manager'})
    }
} 

exports.searchManager = async (req, res) => {

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
        let manager = await Manager.getAll()
        if(!manager){
            console.log("Manager database is empty")
            return res.status(400).send({message: `No manager in database`})
        }
        else{
            search = search.toLowerCase()
            for(let i = 0; i < manager.length; i++){
                const fname = manager[i].first_name.toLowerCase()
                const mname = manager[i].middle_name.toLowerCase()
                const lname = manager[i].last_name.toLowerCase()
                if(fname.match(search) || lname.match(search) || mname.match(search)){
                    result.push(manager[i])
                }
            }
            return res.status(200).send({result})
        }
    }
    catch(err){
        console.log(`Error searching for manager in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for manager'})
    }
} 