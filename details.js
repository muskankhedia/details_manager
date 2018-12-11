const mongo = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/crud_api';
var ObjectID = require('mongodb').ObjectID;

var output = {
    'Success':'N',
    'err':'none',
    'result':[],
};
var isErr=false, unique = false;

function resSend(res) {
    if(isErr==true){
        output.Success='N';
        output.err='some err occuered in the database'
    }
    else{
        output.Success='Y';
        output.err='none';
    }
    res.send(output);
    output.Success='N';
    output.err='none';
    output.result=[];
}

function add(req,res){
    let email = req.body.email,
        username = req.body.username,
        number = req.body.number;
        
    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        colle =  db.listCollections();
        let obj = {
            'email':email,
            'username':username,
            'number':number,
        }
        db.collection('details').insertOne(obj, (e,res1) =>{
            if(e) console.error(e);
            else
                console.warn('[SUCCESS] inserted into the database with username='+username);
            console.warn(res1)
            isErr=false;
            resSend(res);
        })   
    })
}

function read(req,res){
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        colle =  db.listCollections();

        db.collection('details').findOne(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
            isErr=false;
            dbo.close();
        })   
    })
}

function update(req,res){
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        colle =  db.listCollections();
        const note = { text: req.body.body, title: req.body.title };
            db.collection('details').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            } 
            isErr = false;
            dbo.close();
        })   
    })
}


function remove(req,res){
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    mongo.connect(url, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        colle =  db.listCollections();
        db.collection('details').remove(details, (err, item) => {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send('Note ' + id + ' deleted!');
            } 
            isErr=false;
            dbo.close();
        })   
    })
}

//store all the details in the database
function all_details(req,res){
    var member;
    mongo.connect(url,(e,dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        
        db.collection('details').find({}).exec(function(err,members){
            member = members;
        })
        res.send(member)
        db.close();
    });
}




module.exports = {
   add:add,
   read:read,
   update:update,
   remove:remove,
   all_details:all_details,
}