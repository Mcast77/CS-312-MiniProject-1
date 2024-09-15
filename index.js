const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var blogPosts = [];
var idValue = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));

app.get("/", (req,res) =>{
    res.render(path.join(__dirname+"/index.ejs"),{blogPosts:blogPosts});
})

app.post("/addBlog", (req,res) =>{
  req.body.identity = idValue;
  idValue++;
  blogPosts.push(req.body);
  res.render(path.join(__dirname+"/index.ejs"),{blogPosts:blogPosts});
})

app.post("/updateBlog", (req,res) =>{
  postDetails = getPostById(req.body.identity);
  res.render(path.join(__dirname+"/updateForm.ejs"),{blogPost:postDetails});
})

app.post("/uploadUpdate", (req,res) =>{
  updatePost(req.body);
  res.render(path.join(__dirname+"/index.ejs"),{blogPosts:blogPosts});
})

app.post("/", (req,res) =>{
  deletePost( req.body.identity )
  res.render(path.join(__dirname+"/index.ejs"),{blogPosts:blogPosts});
})

app.listen( port, () => {
  console.log(`The server is running on port ${port}.`)
});

function updatePost(newData)
{
 for( let index=0; index < blogPosts.length; index++ )
    {
     if(blogPosts[index].identity == newData.identity )
         {
          blogPosts[index] = newData;
         }
    }
}

function deletePost( idToRemove )
{
  for( let index=0; index<blogPosts.length; index++ )
  {
   if( blogPosts[index].identity == idToRemove )
      {
       blogPosts.splice(index,1);
      }
  }
}

function getPostById( idOfPost )
   {
    for(let index=0;index<blogPosts.length;index++)
    {
      if( blogPosts[index].identity == idOfPost )
        return blogPosts[index];
    }
    return NaN;
   }