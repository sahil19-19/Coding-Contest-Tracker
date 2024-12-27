const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
// import fetch from 'node-fetch';
app.listen(5000, () => {
    console.log("listening");
});

var data;

("https://clist.by/api/v2/contest//?username=rumaan&api_key=dc9ed8b489c640d09ed44b3858901dc0326b0ee1");
const apikey =
    "username=rumaan&api_key=dc9ed8b489c640d09ed44b3858901dc0326b0ee1";
// const api_url='https://kontests.net/api/v1/all'
const api_url = `https://clist.by/api/v4/contest//?${apikey}&upcoming=true&format_time=true`;

fetch(api_url)
    .then((response) => response.json())
    .then((body) => {
        data = body;
        // console.log(data)
        let arr;
        try {
            arr = JSON.parse(data);
        } catch (e) {
            arr = data;
        }

        // console.log(arr);
        app.get("/", (req, res) => {
            res.render("list", { arr: arr.objects });
        });

        app.get("/contest/:name", (req, res) => {
            res.render(req.params.name, { arr: arr.objects });
        });


        app.post("/search", urlencodedParser, function (req, res) {
            var s = [];
            let a = req.body.contest_name;
            let aa = a.toLowerCase();
            for (var i = 0; i < arr.objects.length; i++) {
                let k = arr.objects[i].host.toLowerCase();
                if (k.includes(aa)) s.push(arr.objects[i]);
            }
            if (s.length == 0)
                res.send('<h1 style="color:red">NO RESULTS MATCHED</h1>');
            else res.render("list", { arr: s });

        });
    });
