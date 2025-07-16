const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/Menu');
//creating post method for storing menu data
router.post('/', async (req, res) => {
    try{
        const menu = req.body;
        const newMenu = new MenuItem(menu);

        const data = await newMenu.save();
        console.log("Menu data saved successfully in database");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//Creating api forgetting menu data
router.get('/', async (req, res) => {
    try{
        const menuData = await MenuItem.find();
        console.log("MenuData fetched succefully");
        res.status(200).json(menuData);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

//GET method with parameter
router.get('/:taste', async (req, res) => {
    
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "spicy" || taste == "sour"){
            const response = await MenuItem.find({taste: taste});
            console.log("response fetched");
            res.status(200).json(response);  
        }else{
            res.status(404).json({error: "Invalid taste"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});

    }
});

//PUT method to update the menu items
router.put('/:id', async (req, res) => {
    try{
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body; 

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,
            runValidators: true
        });

        if(!response){
            res.status(404).json({error: "Menu not found"});
        }

        console.log("Menu data updated successfully")
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
    
});

//DELETE method to delete menu items data
router.delete('/:id', async (req, res) => {
    try{
        const menuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if(!response){
            res.status(404).json({error: "MenuItem not found"});
        }

        console.log("menu item data deleted successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});
//comment for testing purpose
module.exports = router;

