const express = require('express');
const data = require('./data');
const cors = require('cors');
let spawn = require('child_process').spawn

let app = express();
app.use(express.json());
app.use(cors());

app.post('/uploadvideo', (req, res) => {
    //console.log(req.body);
    console.log(req.body);
    let dat = data.filter(da => da.name === req.body.fileName)[0];
    return res.json({success: true, msg: "Received", imgPath: dat.img});
});

app.post('/getresults', async (req, res) => {
    let dat = data.filter(da => da.name === req.body.file)[0];
    console.log(dat.outputVideo)
    return res.json({success: true, msg: "Output video", output: dat.outputVideo});
    /*let process = spawn('python', ["./python/src/main.py", "./python/video/"+dat.name, dat.coords[0], dat.coords[1], dat.coords[2], dat.coords[3]]);
    process.stdout.on('data', function(data){
        if("done" === JSON.parse(data.toString()).msg){
            return res.json({ success: true });
        }
    });
    process.stdout.on("error", function(err){
        console.log(err);
        return res.json({success: false, msg:"Error Occured"});
    });*/
});

app.listen(5000, () => {
    console.log("Server Started");
});