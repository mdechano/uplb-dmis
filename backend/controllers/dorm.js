const mongoose = require('mongoose');
const Dorm = require('../handlers/dorm');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addDorm = async (req, res) => {

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

    if (token.user.role == 'dorm manager') {
        const body = req.body;

        const newDorm = {
        dorm_name: body.dorm_name,
        dorm_details: body.dorm_details,
        dorm_manager_id: body.dorm_manager_id,
        dorm_manager_name: body.dorm_manager_name,
        dorm_manager_email: body.dorm_manager_email,
        dorm_manager_contact_number: body.dorm_manager_contact_number,
        dorm_attendant_id: body.dorm_attendant_id,
        dorm_attendant_name: body.dorm_attendant_name,
        dorm_attendant_email: body.dorm_attendant_email,
        dorm_attendant_contact_number: body.dorm_attendant_contact_number,
        office_hours_start: body.office_hours_start,
        office_hours_end: body.office_hours_end,
        late_permit_start: body.late_permit_start,
        late_permit_end: body.late_permit_end,
        overnight_permit_start: body.overnight_permit_start,
        overnight_permit_end: body.overnight_permit_end,
        stayover_permit_start: body.stayover_permit_start,
        stayover_permit_end: body.stayover_permit_end
        };

        try {
            const dorm = await Dorm.create(newDorm);
            await UserLog.create(token.user, 'create', `dorm ${dorm._id}`)
            console.log(`New Dorm: \n ${dorm}`);
            return res.status(201).send({ message: 'New dorm successfully added' });
        }
        catch(err) {
            console.log(`Unable to create new dorm. Error: ${err}`);
            return res.status(500).send({ message: "Error creating new dorm" })
        }

    } else {
        console.log("Unauthorized access")
        return res.status(401).send({message: "Unauthorized access"});
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
        dorm_manager_email: body.dorm_manager_email,
        dorm_manager_contact_number: body.dorm_manager_contact_number,
        dorm_attendant_id: body.dorm_attendant_id,
        dorm_attendant_name: body.dorm_attendant_name,
        dorm_attendant_email: body.dorm_attendant_email,
        dorm_attendant_contact_number: body.dorm_attendant_contact_number,
        office_hours_start: body.office_hours_start,
        office_hours_end: body.office_hours_end,
        late_permit_start: body.late_permit_start,
        late_permit_end: body.late_permit_end,
        overnight_permit_start: body.overnight_permit_start,
        overnight_permit_end: body.overnight_permit_end,
        stayover_permit_start: body.stayover_permit_start,
        stayover_permit_end: body.stayover_permit_end
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

exports.deleteDorm = async (req, res) => {
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
        
    
            let dorm = null;
            try{
                dorm = await Dorm.getOne({_id: idList[i]});  //call to handler here
                //console.log(dorm);
                if(dorm){
                    await Delete.create("dorm", dorm);
                    await UserLog.create(token.user, 'delete', `dorm ${dorm._id}`)
                    await Dorm.delete({_id: idList[i]});
                    console.log('Successfully deleted dorm with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid dorm id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for dorm in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for dorm'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} dorm`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} dorm/s but failed to delete ${failed} dorm/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting dorms ${err}`);
        res.status(500).send({ message: 'Error deleting dorms'});
        return;
    }

}

exports.findDorm = async (req, res) => {
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


    console.log(`dorm id: ${req.params.id}`)
    const id = req.params.id;
    let dorm;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }

    try{
        dorm = await Dorm.getOne({_id: id})
        if(!dorm){
            console.log("Dorm not found")
            return res.status(404).send({message: `dorm not found`})
        }
        else{
            //console.log(dorm)
            return res.status(200).send(dorm)
        }
    }
    catch(err){
        console.log(`Error searching for dorm in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for dorm'})
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

    let dorm;
    try{
        dorm = await Dorm.getAll()
        if(!dorm){
            console.log("Dorm database is empty")
            return res.status(404).send({message: `No dorm in database`})
        }
        else{
            //console.log(dorm)
            return res.status(200).send(dorm)
        }
    }
    catch(err){
        console.log(`Error searching for dorm in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for dorm'})
    }
}

exports.searchDorm = async (req, res) => {
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
        let dorm = await Dorm.getAll()
        if(!dorm){
            console.log("Dorm database is empty")
            return res.status(400).send({message: `No dorm in database`})
        }
        else{
            search = search.toLowerCase()
            for(let i = 0; i < dorm.length; i++){
                const dorm_name = dorm[i].dorm_name.toLowerCase()
                if(dorm_name.match(search)){
                    result.push(dorm[i])
                }
            }
            return res.status(200).send({result})
        }
    }
    catch(err){
        console.log(`Error searching for dorm in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for dorm'})
    }
}