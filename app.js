const express = require("express");
const handler = require("./handler");
const fs = require("fs");
const app = express();
const port = 8443;

var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/lib", express.static(__dirname + "public/lib"));
app.use("/scripts", express.static(__dirname + "public/scripts"));

var imageFiles = [];

fs.readdir("W:/nssm Web/public/images/doors", function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  // console.log(files);
  files.forEach(function (file) {
    imageFiles.push(file);
  });
});

fs.readFile(
  "public/json/ourworks.json",
  "utf8",
  function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      console.log(obj);
      for (var i = 0; i < imageFiles.length; i++) {
        if(!imageFiles[i] in  obj.fileNames) {
          obj.ourwork.push({
            src: `images/myimages/${imageFiles[i]}`,
            title: `${imageFiles[i]}`,
            desc: `Code1`,
          });
        }
      }
      json = JSON.stringify(obj);
      fs.writeFile("public/json/ourworks.json", json, function () {
        console.log("done");
      });
    }
  }
);

// new init(imageFiles)

app.get("", (req, res) => {
  res.sendFile(__dirname + "/views/index.html", {
    image: "images/myimages/1.jpg",
  });
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

app.get("/products", (req, res) => {
  res.sendFile(__dirname + "/views/products.html");
});

app.get("/doorimages", (req, res) => {
  res.send(imageFiles);
});

app.post("/submitmail", urlencodedParser, (req, res) => {
  console.log("Got body:", req.body);
  const email = req.body.email;
  const query = req.body.message;
  handler.sendMail(email, query);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`listening port: ${port}`));
