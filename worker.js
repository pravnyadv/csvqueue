var Bull = require('bull');
const csv = require('fast-csv');
const db = require('./queries')
const validation = require('./validation')

// add redis credentials if password is set
const worker = new Bull('process-csv');

worker.process(async (job) => {
	let file = job.data;
	let path = 'uploads/'+file.name;
    csv.parseFile(path, {headers: true})
    .on("data", function (data) {
    	let names = Object.keys(data).join(',').toLowerCase().replace(/ /g, '_');
    	let values = Object.values(data).map(s => s.trim());
    	let validate = validation.validateRow(values);
    	if(validate === true) {
    		db.addSales(names, values);
    		console.log('saved row')
    	} else {
    		console.log(validate);
    	}
    })
    .on("end", function () {
    	console.log('done');
    });
    return true;
});