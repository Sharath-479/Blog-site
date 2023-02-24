//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesqueelit ullamcorper";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/",function(req,res){
  res.render("home",{startingcontent:homeStartingContent,array:posts});
});

app.get("/contact",function(req,res){
  res.render("contact",{concontent:contactContent});
});

app.get("/about",function(req,res){
  res.render("about",{acontent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");

});

app.post("/compose",function(req,res){
  let post={
    title: req.body.posttitle,
    content: req.body.posttext
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/post/:keyword",function(req,res){
  posts.forEach(function(a){
    let loname=_.lowerCase(req.params.keyword);
    if(loname===_.lowerCase(a.title)){
      res.render("post",{restitle:a.title,rescontent:a.content});
    }
    else{
      res.render("/");
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
