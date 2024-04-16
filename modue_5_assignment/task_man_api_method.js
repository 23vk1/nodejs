const libExpress = require('express');
const app = libExpress();
const PORT = 3000;

// parse json
app.use(libExpress.json());

let tasks = [
    { id: 1, title: 'assignemt', description: 'nee dto complete assignment', task_done: false },
    { id: 2, title: 'project', description: 'project completed', task_done: false }
];


// get method /////////

app.get('/tasks', (req, res) => {
    res.status(200).json({ tasks });
});


// // post method /////////////////////////////////////////////
app.post('/tasks', (req, res) => {

    const title = req.body.title;
    const description = req.body.description;

    // task object 
    const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description,
        task_done: false
    };

    tasks.push(newTask);
    res.status(200).json({ task: newTask });
});


// // put method  ///////////
app.put('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    let x = -1;
    let newTask = null;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            newTask = { ...tasks[i], ...req.body };
            x = i;
            // tasks[i]={ ...tasks[i], ...req.body };
            // res.status(200).json(tasks[i])
            break;
        }
    }
    if (newTask != null) {
        tasks[x] = newTask;
        res.status(200).json(tasks[x]);
    }
    else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// // patch method ///////////////////////////////
app.patch('/tasks/:id', (req, res) => {
    const taskID = Number(req.params.id);
    let x = -1;
    let newUpdate = req.body;
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].id == taskID){
            x = i;
            for(const key in newUpdate){
                if(key != 'id'){
                    tasks[x][key] = newUpdate[key]; 
                }
            }
        }
    }
    if(x>=0){
        res.status(200).json(tasks[x]);
    }
    else{
        res.status(404).json({error : "task not found"});
    }
});

// // delet method ///////////////////////////
app.delete('/tasks/:id',(req,res)=>{
    const taskId = Number(req.params.id);
    let x = -1;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId){
            x = i;
            break;
        }
    }
    if(x != (-1)){
        tasks.splice(x,1);
        res.status(200).json({success : "deleted"});
    }
    else{
        res.status(404).json({error : "task not found"});
    }
});

// server start
app.listen(PORT, () => {
    console.log(`Server is started on port 3000`);
});
