const app = require('express')(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 3000,
      details_data = require('./details'),
      path = require('path'),
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

    app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

    //Index Route
    app.get('/',(req,res) => {
        res.render('index')
    });

    app.post('add_details',(req,res) => {
        
    });

    app.post('/details', (req,res) => {
        console.log(req.body);
        details_data.add(req,res);
        var members = details_data.all_details();
        res.render('details',{details:members});
    });

    app.get('/details', (req,res)=>{
        var members = details_data.all_details();
        res.render('details',{details:members});
    })

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
