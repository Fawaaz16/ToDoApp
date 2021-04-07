var express = require('express');
const mongoose = require('mongoose');
const List = require('./models/list');
//var todoController = require("./controllers/todoController");
var app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://qureshi:Iamsorry1@todoapp.8iayk.mongodb.net/todoapp?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

 //app.use(express.json()); //Used to parse JSON bodies

//set up template engine
app.set('view engine' , 'ejs');

//static files
app.use(express.static('./public'));
app.use(express.urlencoded({ extended : true})); //middleware enabled. allows to handle url encoded data


// app.get('/add-list', (req, res) => {
//     const list = new List({
//         body: 'aaa'
//     });

//     list.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/all-lists' , (req , res) => {
//     List.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/single-list' , (req , res) => {
//     List.findById('606c6985a2c3e51b183a335e')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.get('/' , (req , res) => {
    res.redirect('/lists');
})
app.get('/lists' , (req , res) => {
    List.find()
        .then((result) =>{
            res.render('todo' , {lists : result })
        })
        .catch((err) =>{
            console.log(err);
        })
})
app.post('/lists' , (req , res) => {
    //console.log(req.body);
    const list = new List(req.body);
        
            list.save()
                .then((result) => {
                    res.redirect('/lists');
                })
                .catch((err) => {
                    console.log(err);
                });
})
app.get('/lists/:id' , (req , res) => {
    const id = req.params.id;
    //console.log(id);
    List.findById(id)
        .then(result => {
            res.render('details' , {lists : result});
        })
        .catch(err =>{
            console.log(err);
        })
})
app.delete('/lists/:id' , (req , res) => {
    const id = req.params.id;
    //console.log(id);
    List.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/lists'});
        })
        .catch(err =>{
            console.log(err);
        })
})


//fire controller
//todoController(app)

//listen to port

console.log('You are listening to port 3000');


