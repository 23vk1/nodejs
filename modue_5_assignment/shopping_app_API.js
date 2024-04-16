const express = require('express');
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId 

const objectId = new ObjectId();

const app = express();
const client = new MongoClient('mongodb://127.0.0.1:27017');
app.use(express.json());


// // get method // // // // 
app.get('/Product',async (req,res)=>{
  try{
    await client.connect();
    const products = await client.db('Online_Shopping').collection('Product').find().toArray();
    res.status(200).json(products);
  } catch(err){
    console.log("error",err);
    res.status(500).json({error :"server error"});
  } finally{
    await client.close()
    console.log("momngodb connection close");
  }
})

// // post method  // // 
app.post('/Product', async (req, res) => {
  try{
    await client.connect();
    const result = await client.db('Online_Shopping').collection('Product').insertOne(req.body);
    res.status(200).json({message:'added'});
  } 
  catch(err){
    console.error("error", err)
    res.status(500).json({error: "server error"});
  } 
  finally{
    await client.close();
    console.log("mongodb connection closed");
  }
})


// // put method // // 
app.put('/Product/:id', async (req, res) => {
  const Id = req.params.id;
  const updatedProduct = req.body
  try{
    await client.connect();
    await client.db('Online_Shopping').collection('Product').updateOne({_id:objectId.Id},{$set: updatedProduct})
    // //$set:updatedProduct    //// this is the update operation 
    // //(it uses $set operator to change values of selected document with new document)
    res.status(200).json({ message: 'updated'});
  } 
  catch (err) {
    console.error("error", err);
    res.status(500).json({error:"server error"});
  } 
  finally {
    await client.close();
    console.log("mongodb connection closed");
  }
})

// // patch method // // // 
app.patch('/Product/:id', async (req, res) => {
  const Id = req.params.id;
  const updatedField = req.body
  try{
    await client.connect();
    await client.db('Online_Shopping').collection('Product').updateOne({_id:objectId.Id},{$set:updatedField});
    // //$set:updatedProduct (this is the update operation)
    res.json({message:'updated successfully'});
  } 
  catch(err){
    console.error("error",err)
    res.status(500).json({error:"server error"});
  } 
  finally{
    await client.close();
    console.log("mongodb connection closed");
  }
})


// //  delet method  // // // // // 
app.delete('/Product/:id', async(req, res) => {
  const Id = req.params.id;
  try{
    await client.connect();
    await client.db('Online_Shopping').collection('Product').deleteOne({_id:objectId.Id});
    res.json({message:'deleted'});
  } 
  catch(err){
    console.error("error", err)
    res.status(500).json({error:"server error"})
  } 
  finally{
    await client.close();
    console.log("mongodb connection closed");
  }
})





app.listen(3000,()=>{
  console.log("server started at port 3000");
})


