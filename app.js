const app = require('express')(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 5000,
      details_data = require('./details'),
      url = '0.0.0.0';


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true,
    }));
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Index Route
    app.get('/',(req,res) => {
        res.sendFile(__dirname + "/views/index.html")
    });

    app.post('/details', (req,res) => {
        console.log(req.body);
        details_data.add(req,res);
    });

    //Add Route
    app.get('/add',(req,res) => {
        res.sendFile(__dirname + "/views/add.html")
    });

    //Read Details Route
    app.get('/read',(req,res) => {

    });

    //Edit Details Route
    app.get('/edit',(req,res) => {

    });

    //Delete Details Route
    app.get('/delete',(req,res) => {

    });

const server = app.listen(port, url, e => {
    if(e) throw e;
    else {
        console.warn('Running at \n'+server.address().address + '\t' +server.address().port);
        
    }
});
