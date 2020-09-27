const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const Queue = require('bull');
const processCsv = new Queue('process-csv')
const app = express();
const port = 3000;

app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (request, response) => {
    response.json({ status: "ok" });
});

app.post("/upload", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: 'error',
                message: "No file uploaded",
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let file = req.files.file;
            if(!file || file.mimetype != 'text/csv') {
            	return res.send({
	                status: 'error',
	                message: "Provide a valid csv file",
	            });
            }
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv("uploads/" + file.name);

            processCsv.add({name: file.name})
            //send response
            res.send({
                status: true,
                message: "File is uploaded, your data will be saved in database soon",
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})