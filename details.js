const mongo = require('mongodb').MongoClient,
    url = "mongodb+srv://cluster0-wcimw.mongodb.net/test --username muskan";

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
        console.log(db);
        colle =  db.listCollections();
        console.log(colle)
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
            dbo.close();
            resSend(res);
            
        })
        
    } )


}

function read(req,res){

}

function update(req,res){

}

function remove(req,res){

}




module.exports = {
   add:add,
   read:read,
   update:update,
   remove:remove,
}