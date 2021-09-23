import express from 'express';
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/about', function (req, res) {
    res.send('Hello World from about page')
  });

app.get('/contact', function (req, res) {
    res.send('Hello World from contact page')
  });
app.listen(3000)