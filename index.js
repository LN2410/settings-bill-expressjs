const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBillFunc = require('./settings-bill');

const app = express();
const settingsBill = SettingsBillFunc();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req,res){
	//getting the costs
	let callCost = settingsBill.getCall();
	let smsCost = settingsBill.getSms();
	let warningLevel = settingsBill.getWarning();
	let criticalLevel = settingsBill.getCritical();
	// getting the totals
	let grandTotal = settingsBill.totalBill3();
	let callTotal = settingsBill.callBill3();
	let smsTotal = settingsBill.smsBill3();

	let colour ='';

	if (grandTotal >= criticalLevel) {
		colour = "danger"
	}
	else if (grandTotal >= warningLevel) {
		colour = "warning"
	}

	res.render('index', {
		// settings: settingsBill
		grandTotal,
		callTotal,
		smsTotal,
		callCost,
		smsCost,
		warningLevel,
		criticalLevel,
		colour
	});
});

app.use(express.static('public'));

app.post('/settings', function(req,res){
	console.log(req.body);
	let callCost = parseFloat(req.body.callCost);
	let smsCost = parseFloat(req.body.smsCost);
	let warningLevel = parseFloat(req.body.warningLevel);
	let criticalLevel = parseFloat(req.body.criticalLevel);

	settingsBill.setCallCost(callCost);
	settingsBill.setSmsCost(smsCost);
	settingsBill.setWarningLevel(warningLevel);
	settingsBill.setCriticalLevel(criticalLevel);

	console.log(callCost);
	res.redirect('/');
});

app.post('/action', function(req,res){
	let action = req.body.actionType;
	settingsBill.bill3(action);

	res.redirect('/');
});

app.get('/actions', function(req,res){
	res.render('actions',{stampAction: settingsBill.getStamp()} )

});

app.get('/actions/:type', function(req,res){
	let temporary = req.params.type;
	 settingsBill.getStamp()
	res.render('actions', {stampAction: settingsBill.filter(temporary)})
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
	console.log("app started at port:", PORT)
});
