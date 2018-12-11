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
        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            db.collection('details').find().toArray( function(err, members) {   
                if (err) throw err;
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
    app.get('/details/:id',(req,res) => {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            colle =  db.listCollections();
    
            db.collection('details').findOne(details, (err, members) => {
                if (err) {
                  res.send({'error':'An error has occurred'});
                } else {
                  res.render('read',{"members":members});
                }
                isErr=false;
                dbo.close();
            })   
        })
    });

    //Edit Details Route
    app.get('/edit/:id',(req,res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
    
        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            
            db.collection('details').findOne(details, (err, members) => {
                if (err) {
                  res.send({'error':'An error has occurred'});
                } else {
                  res.render('edit',{"members":members});
                }
                isErr=false;
                dbo.close();
            })    
        })
    });

    app.post('/edited/:id', (req,res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };


        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            const note = { username: req.body.username, email: req.body.email, number:req.body.number };
            db.collection('details').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.render("index");
            } 
            isErr = false;
            dbo.close();
           })  
        })
    })

    //Delete Details Route
    app.get('/delete/:id',(req,res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
    
        mongo.connect(url1, (e, dbo) => {
            if(e) console.error(e);
            console.warn('[SUCCESS] connected to the database');
            let db = dbo.db('crud_api');
            colle =  db.listCollections();
            db.collection('details').remove(details, (err, item) => {
                if (err) {
                  res.send({'error':'An error has occurred'});
                } else {
                  res.render('delete');
                } 
                isErr=false;
                dbo.close();
            })   
        })
    });



const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
});
