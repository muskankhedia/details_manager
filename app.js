const app = require('express')(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 3000,
      details_data = require('./details'),
      path = require('path'),
      url = '0.0.0.0';

const mongo = require('mongodb').MongoClient,
url1 = 'mongodb://localhost:27017/crud_api';
var ObjectID = require('mongodb').ObjectID;

mongo.connect(url1,(e,dbo) =>{
    if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        var colle = db.collection('details').find({});
        console.log(colle)
        dbo.close();
})


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true,
    }));
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

    //Index Route
    app.get('/',(req,res) => {
        res.render('index')
    });

    app.post('/details', (req,res) => {

        let email = req.body.email,
        username = req.body.username,
        number = req.body.number;
        
    mongo.connect(url1, (e, dbo) => {
        if(e) console.error(e);
        console.warn('[SUCCESS] connected to the database');
        let db = dbo.db('crud_api');
        // colle =  db.listCollections();
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
        })   
    })

        console.log(req.body);
        
        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            db.collection('details').find({}, function(err, members) {   
                if (err) throw err;
                console.log("hii")
                // console.log(members)
                console.log(members.username)
                res.render('details', { "members": members });  
        })
        dbo.close();
    });
});

    app.get('/details', (req,res)=>{
        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            db.collection('details').find().toArray(function(err, members){   
                if (err) throw err;
                console.log("hii")
                // console.log(members)
                console.log(members.username)
                res.render('details', { "members": members });  
        })
        dbo.close();
    })
});

    //Add Route
    app.get('/add',(req,res) => {
        res.render('add');
    });

    //Read Details Route
    app.get('/read/:id',(req,res) => {
        details_data.read(req,res1);
        console.log(res1);
        res.render(read,{details:res1})
    });

    //Edit Details Route
    app.put('/edit/:id',(req,res) => {
        details_data.update(req,res);
    });

    //Delete Details Route
    app.get('/delete/:id',(req,res) => {
        details_data.put(req,res);
    });



const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
});
