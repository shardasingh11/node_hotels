const express = require('express');
const router = express.Router();


const Person = require('./../models/Person');


//POST method to add the person data
router.post('/', async(req, res) => {

    try{
        
        const data = req.body; //Assuming the request body contains the person data

        //Create a new person document using the mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }

});

//GET method to fetch the person data
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("data fetched successfully");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

//creating api with parameter
router.get('/:workType', async (req, res) => {
    try{
        //Extract workType from the url parameter
        const workType = req.params.workType;
        //check validation of workType
        if(workType == "chef" || workType == "manager" || workType == "waiter"){
            const response = await Person.find({work: workType});
            console.log("response fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid work type"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

//PUT method to update person data
router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if(!response){
            res.status(404).json({error: "Person not found"});
        }

        console.log("data updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }

});

//DELETE method to delete the Person data
router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error: "Person not found"});
        }
        console.log("data deleted successfully");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}) 

module.exports = router;