const mongoose = require('mongoose');
const Resident = require('../handlers/resident');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.addResident = async (req,res) => {
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

    const newResident = {
        user_id: body.user_id,
        role: body.role,
        dorm: body.dorm,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        student_no: body.student_no,
        civil_status: body.civil_status,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        region: body.region,
        college: body.college,
        degree_program: body.degree_program,
        last_school_attended: body.last_school_attended,
        classification: body.classification,
        honors_received: body.honors_received,
        talents: body.talents,
        hobbies: body.hobbies,
        organizations: body.organizations,
        ailments: body.ailments,
        medications: body.medications,
        scholarships: body.scholarships,
        monthly_stipend: body.monthly_stipend,
        parents_status: body.parents_status,
        father_details: body.father_details,
        mother_details: body.mother_details,
        number_of_brothers: body.number_of_brothers,
        number_of_sisters: body.number_of_sisters,
        birth_order: body.birth_order,
        check_in_out_details: body.check_in_out_details,
        appliances: body.appliances,
        appliances_information: body.appliances_information,
        emergency_details: body.emergency_details,
        slas: body.slas,
        payment_details: body.payment_details,
        violation_details: body.violation_details,
        picture_id: body.picture_id,
        dorm_id: body.dorm_id
    };
    try{
        const existing = await Resident.getOne({student_no: newResident.student_no})
        if(existing){
            return res.status(400).send({ message: "Resident already exists" })
        }
    }
    catch(err){
        console.log(`Unable to find resident. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new resident" })
    }

    try {
        const resident = await Resident.create(newResident);
        await UserLog.create(token.user, 'create', `resident ${resident._id}`)
        console.log(`New resident: \n ${resident}`);
        return res.status(201).send({ message: 'New resident successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new resident. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new resident" })
    }
}

exports.editResident = async (req,res) => {

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
    console.log(`resident id: ${req.params.id}`)

    const resident = {
        id: req.params.id,
        user_id: body.user_id,
        role: body.role,
        dorm: body.dorm,
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        sex: body.sex,
        student_no: body.student_no,
        civil_status: body.civil_status,
        birthday: body.birthday,
        contact_number: body.contact_number,
        email: body.email,
        home_address: body.home_address,
        region: body.region,
        college: body.college,
        degree_program: body.degree_program,
        last_school_attended: body.last_school_attended,
        classification: body.classification,
        honors_received: body.honors_received,
        talents: body.talents,
        hobbies: body.hobbies,
        organizations: body.organizations,
        ailments: body.ailments,
        medications: body.medications,
        scholarships: body.scholarships,
        monthly_stipend: body.monthly_stipend,
        parents_status: body.parents_status,
        father_details: body.father_details,
        mother_details: body.mother_details,
        number_of_brothers: body.number_of_brothers,
        number_of_sisters: body.number_of_sisters,
        birth_order: body.birth_order,
        check_in_out_details: body.check_in_out_details,
        appliances: body.appliances,
        appliances_information: body.appliances_information,
        emergency_details: body.emergency_details,
        slas: body.slas,
        payment_details: body.payment_details,
        violation_details: body.violation_details,
        picture_id: body.picture_id,
        dorm_id: body.dorm_id
    };

    try{
        mongoose.Types.ObjectId(resident.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Resident.getOne({_id: resident.id});
        if (!existing) {
            console.log("Resident not found")
            return res.status(404).send({ message: 'Resident not found' });
        }
    }
    catch(err){
        console.log(`Error looking for resident in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for resident in database' })
    }

    try{
        const edit = await Resident.edit(resident)
        await UserLog.create(token.user, 'edit', `resident ${edit._id}`)
        console.log(`Edited resident ${edit}`)
        return res.status(200).send({ message: 'Resident successfully edited' })
    }
    catch{
        console.log(`Unable to edit resident. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing resident' })
    }
}

exports.deleteResident = async (req,res) => {

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
        
    
            let resident = null;
            try{
                resident = await Resident.getOne({_id: idList[i]});  //call to handler here
                //console.log(resident);
                if(resident){
                    await Delete.create("resident", resident);
                    await UserLog.create(token.user, 'delete', `resident ${resident._id}`)
                    await Resident.delete({_id: idList[i]});
                    console.log('Successfully deleted resident with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid resident id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for resident in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for resident'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} resident`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} resident/s but failed to delete ${failed} resident/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting residents ${err}`);
        res.status(500).send({ message: 'Error deleting residents'});
        return;
    }
    
}

exports.findResident = async (req,res) => {

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


    console.log(`resident id: ${req.params.id}`)
    const id = req.params.id;
    let resident;

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
            console.log("Resident not found")
            return res.status(404).send({message: `resident not found`})
        }
        else{
            //console.log(resident)
            return res.status(200).send(resident)
        }
    }
    catch(err){
        console.log(`Error searching for resident in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for resident'})
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

    let resident;
    try{
        resident = await Resident.getAll()
        if(!resident){
            console.log("Resident database is empty")
            return res.status(404).send({message: `No resident in database`})
        }
        else{
            //console.log(resident)
            return res.status(200).send(resident)
        }
    }
    catch(err){
        console.log(`Error searching for resident in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for resident'})
    }
}

exports.searchResident = async (req, res) => {

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
        let resident = await Resident.getAll()
        if(!resident){
            console.log("Resident database is empty")
            return res.status(400).send({message: `No resident in database`})
        }
        else{
            search = search.toLowerCase()
            for(let i = 0; i < resident.length; i++){
                const fname = resident[i].first_name.toLowerCase()
                const mname = resident[i].middle_name.toLowerCase()
                const lname = resident[i].last_name.toLowerCase()
                if(fname.match(search) || lname.match(search) || mname.match(search)){
                    result.push(resident[i])
                }
            }
            return res.status(200).send({result})
        }
    }
    catch(err){
        console.log(`Error searching for resident in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for resident'})
    }
}