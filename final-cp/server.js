// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;


app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:user});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
         name:req.body.name, role: 'user'});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first();
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.get('/api/users/:id/notes', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('notes','users.id','notes.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('notes.id','note','username','created').then(notes => {
      res.status(200).json({notes:notes});
    }).catch(error => {
      res.status(500).json({ error });
    });
});


app.post('/api/users/:id/notes', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('notes').insert({user_id: id, note:req.body.note.note, favorite:req.body.note.favorite});
  }).then(ids => {
    return knex('notes').where('id',ids[0]).first();
  }).then(note => {
    res.status(200).json({note:note});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.put('/api/users/:id/notes/:noteId', (req, res) => {
  let id = parseInt(req.params.id);
  let noteId = parseInt(req.params.noteId);

  console.log("req body " + Object.values(req.body.note));
  let mynote = (req.body.note).split(",");
  console.log("here " + mynote);

  knex('users').where('id',id).first().then(user => {
    return knex('notes').where({'user_id':id,id:noteId}).update({note:mynote});
  }).then(notes => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({error});
  });
});

app.delete('/api/users/:id/notes/:noteId', (req, res) => {
  let id = parseInt(req.params.id);
  let noteid = parseInt(req.params.noteId);

  knex('users').where('id',id).first().then(user => {
    return knex('notes').where({'user_id':id,id:noteid}).del();
  }).then(notes => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({error});
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));