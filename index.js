const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override")

const { v4: uuidv4 } = require("uuid");

const port = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
	
];


app.get("/", (req,res) => {
	res.render("home.ejs");
})

app.get("/posts", (req,res) => {
	res.render("index.ejs", { posts });
})

app.get("/posts/new", (req,res) => {
	res.render("new.ejs");
})

app.post("/posts", (req,res) => {
	// console.log(req.body);
	let {username,content} = req.body;
	let id = uuidv4();
	posts.push({ id, username,content});
	// res.send("working");
	res.redirect("/posts");
})

app.get("/posts/:id", (req,res) => {
	let { id } = req.params;
	// console.log(id);
	let post = posts.find((p) => id === p.id);
	// console.log(post);
	res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res) => {
	let { id } = req.params;
	// console.log(id);
	let newContent = req.body.content;
	let post = posts.find((p) => id === p.id);
	post.content = newContent;
	res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {
	let { id } = req.params;
	let post = posts.find((p) => id === p.id);
	res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res) => {
	let { id } = req.params;
	posts = posts.filter((p) => id !== p.id);
	res.redirect("/posts");
})

app.listen(port, (req,res) => {
	console.log("listening");
})
