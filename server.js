const express = require('express')
const renderFile = require('ejs').renderFile
const app = express()

const theRootDir = __dirname + '/dist/'
const PORT = process.env.PORT || 3000

// got env port for heroku or elsewhere, else set to 3000 for dev
app.set('port', PORT)

app.set('views', './public/views');
app.engine('html', renderFile)
app.set('view engine', 'html');

// serving all files from dist/assets/
app.use( express.static( __dirname + '/public/assets') );

// get the root page
app.get('/', function (req, res) {
  res.render('index');
});

//get the register page
app.get('/about', function (req, res) {
  res.render('about-page');
});

app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
