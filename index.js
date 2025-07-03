import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

// Navegation
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blog.ejs", { posts });
});

app.get("/post", (req, res) => {
  res.render("post.ejs", { post: null });
});

let posts = [];


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// New post
let lastID = 0;
app.post("/submit", (req, res) => {
  const id = lastID;
  lastID++;
  const author = req.body["author"];
  const title = req.body["title"];
  const time = new Date();
  const text = req.body["text"];
  posts.push({
    id,
    author,
    title,
    time,
    text
  });
  res.redirect("/blog");

  
});

// Edit post
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post.ejs", { post });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (post) {
    post.author = req.body["author"];
    post.title = req.body["title"];
    post.text = req.body["text"];
    post.time = new Date(); 
  }

  res.redirect("/blog");
});

// Delete posts
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.redirect("/blog");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});