
const { ObjectId } = require('bson');
const libExpress = require('express');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const app = libExpress();

app.use(libExpress.json());

const client = new MongoClient(process.env.MONGO_URL);
const objectId = new ObjectId();
    async function dbConnection(){
        
    }

/*
//  Q3. Create database for online shopping app.

    Create a New Database:MongoDB creates a database when you first store data in it. 
    So, to create a new database, simply start using it by storing some data.
    // for our case 
    client.connect();   // mongoDB connection
    const database = client.db('online_shopping');    // it will creates a new database if not existed

*/



/*
//  Q4. Create Require collections for online shopping app and documents.
//  to create new collection in existig database
        database.createCollection(collectionName);
*/




/*
Q5. Write command to show all data from product collections and sort in ascending order.
*/
app.get('/Product', async(req, res)=>{
    try{
        await client.connect(); 
        const db = await client.db(process.env.MONGO_DB).collection(process.env.DB_PRODUCT).find().sort({name:1}).toArray();    
        // here sort({name:1 used to show data in ascending order of product name})
        res.status(200).json(db);
        console.log("get data");
    }
    catch(e){
        console.log(e)
    }
    finally{
        await client.close();
        console.log("mongo connection closed");
    }
})

/*
Q6. Update product price for particular product
*/
app.patch('/Product/:id', async (req, res) => {
    const Id = req.params.id;
    const updatedPrice = req.body;
    try{
        await client.connect();
        await client.db(process.env.MONGO_DB).collection(process.env.DB_PRODUCT).updateOne({_id:objectId.Id},{$set:updatedPrice});
        res.status(200).json({message : "updated"})
        coknsole.log("updated");
    }
    catch(e){console.log(e);}
    finally{
        await client.close();
        console.log("mongo connection closed");
    }

})


/*
Q7. Write command to delete particular product.
*/
app.delete('/Product/:id', async(req, res)=>{
    const Id = req.params.id;
    try{
        await client.connect();
        await client.db(process.env.MONGO_DB).collection(process.env.DB_PRODUCT).deleteOne({_id : objectId.Id});
        // ro delet an entier collection use this code 
        // await client.db(process.env.MONGO_DB).collection(process.env.DBC_DELET).drop();
        res.status(200).json({message : "product deleted"});
        console.log("product deleted");
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
        console.log("mongo connection closed");
    }
})














app.listen(3000,()=>{
    console.log("server started at port 3000");
})

