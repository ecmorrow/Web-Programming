const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))


let matches = [];
let dogs = [];
let resp = [];
let id = 0;
let number = 0;

app.get('/api/matches', (req, res) => {
  res.send(matches);
});

app.put('/api/addDog', (req,res) => {
  console.log("adding dog");
  dogs.push(req.body.dog);

  console.log("adding dog");
  console.log(req.body.dog);
  console.log(dogs.length);
  res.sendStatus(200);
})

app.get('/api/adoptdogs', (req,res) => {
  if (resp.length === 0) {
    axios({
          method:'get',
          url:'https://api.rescuegroups.org/rest/?key=8oqHMgcE&type=animals&limit=100',
          responseType:'document'
        })
        .then(response => {
            resp.push(response.data)

            // console.log("response " + response)
            // console.log("resp " + resp);    

            // this.dogs = response.data.getElementsByTagName("pet");
            // let dogs = $('data').find('pet');
            // console.log(data); 
            res.send(resp);
            return true;
        })
  }
  else res.send(resp);
})

app.get('/api/dogs', (req,res) => {
  console.log("getting dogs")
  console.log(dogs.length)
  res.send(dogs);
})

app.put('/api/matches/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.completed = req.body.completed;
  item.text = req.body.text;
  res.send(item);
});

app.put('/api/number', (req,res) => {
  console.log("req number");
  console.log(req.body.number);
  number++;
  res.sendStatus(200);
})

app.get('/api/number',(req,res) => {
  res.send(String(number));
})

app.post('/api/matches', (req, res) => {
  id = id + 1;
  let dog1 = {id:id, name:req.body.name, img:req.body.img, age:req.body.age, breed:req.body.breed, sex:req.body.sex,size:req.body.size,description:req.body.description};
  matches.push(dog1);
  res.send(dog1);
});

app.get('/api/getCurrDog', (req,res) => {
  res.send(dogs[number])
})

app.post('/api/dogs', (req, res) => {
  let dogs = req.body.dogs;
  console.log("settings dogs");
  console.log(req.body);
  res.send(dogs);
});

app.delete('/api/matches/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = matches.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  matches.splice(removeIndex, 1);
  res.sendStatus(200);
});


app.listen(3000, () => console.log('Server listening on port 3000!'))