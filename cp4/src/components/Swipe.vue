
<template>
<div id="app">
  <div>
    <div class="header">
      <ul>
        <li><router-link to="/matches">Matches</router-link></li>
        <li><router-link to="/" id="active">Home</router-link></li>
      </ul>
    </div>
    <div class="tbg animate-bottom" id="myDiv">
      
      <div class="theader">
        <div class="tlogo">
          <h2>Woof</h2>
        </div>
      </div>
      <div v-if="noDogs">
        <p>No dogs available at this time</p>
      </div>
      <div v-else>
        <div class="tbgwrap">
          <div id="photo" class="tphoto">
            <img id="image" v-bind:src="img"/>
            <div class="tname" id="name">{{ name }}, {{ age }}</div>
          </div>
          <div class="tcontrols">
            <div @click="nextDog" class="tno" id="dislike"><i class="fa fa-times" aria-hidden="true"></i></div>
            <div @click="showModal = true" class="ti"><i class="fa fa-info" aria-hidden="true"></i></div>
            <modal v-show="isModalVisible" @close="closeModal"></modal>
            <div @click="addDog" class="tyes" id ="like"><i class="fa fa-heart" aria-hidden="true"></i></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <i class="fa fa-github fa-lg inline" aria-hidden="true"></i>
        <a class="light" href="https://github.com/EmMorrow/cs260/tree/master/cp3" target="_blank">GitHub</a>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import modal from './modal.vue';


export default {
  name: 'Swipe',
  components: {
    modal,
  },
  data () {
    return {
      isModalVisible: false,
      loading: true,
      number: 0,
      name: '',
      age:'',
      dogs:[],
      dog:{},
      img:'',
      max: 5,
      noDogs: false,
      response:{},
    }
  },
  created: function() {
    // this.xkcd();
    // this.getDogs();
    this.getCurrDog();
    
  },
  watch: {
    name: function(value) {
        this.name = value;
    },
  },
  methods: {
    getCurrDog: function() {
      axios.get("/api/getCurrDog", {
       }).then(response => {
        this.dog = response.data; //response.data?
        console.info(response.data);
        this.setDog();
        if (this.dog == "") {
          this.noDogs = true;
          this.getAdoptableDogs();
        }
       }).catch(err => {
       });
    },
    getNum: function() {
      axios.get("/api/number", {
       }).then(response => {
        this.number = parseInt(response);
       }).catch(err => {
       });
    },
    parseXml: function(xmlStr) {
      console.info("hi");
      return new window.DOMParser().parseFromString(xmlStr, "text/xml");
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getAdoptableDogs: function() {
      console.info('getting adoptable dogs');
      if (this.dogs.length == 0) {
        axios.get("/api/adoptdogs", {
         }).then(response => {
              this.response = response;
              var xml = this.parseXml(response.data[0]);
              var dogsPre = xml.documentElement.getElementsByTagName("pet")
              this.dogs = new Array();
              if(this.dogs.length > 0) noDogs = false;
              for (var i = 1; i < dogsPre.length; i++) {
                var newDog = new Object();
                newDog.num = i;
                newDog.name = dogsPre[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                newDog.age = dogsPre[i].getElementsByTagName("age")[0].childNodes[0].nodeValue;
                newDog.img = dogsPre[i].getElementsByTagName("pic1")[0].childNodes[0].nodeValue;
                newDog.breed = dogsPre[i].getElementsByTagName("breed")[0].childNodes[0].nodeValue;
                newDog.sex = dogsPre[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue;
                newDog.size = dogsPre[i].getElementsByTagName("size")[0].childNodes[0].nodeValue;
                newDog.description = dogsPre[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
                console.info(dogsPre[i])
                this.dogs.push(newDog);
                this.addNewDog(newDog);
              }
              this.setDog();
              setDogs();
              return true;
         }).catch(err => {
         });
       }
    },
    getDogs: function() {
      console.info('getting dogs');
      axios.get("/api/dogs", {
       }).then(response => {
          console.info(response.data[0]);
          this.dogs = response.data;
          if (this.dogs.length === 0) this.getAdoptableDogs();
          else {
            this.getNum();
            this.setDog();
          }   
       }).catch(err => {
       });
    },
    setDogs: function() {
      console.info("settings dogs");
      axios.post("/api/dogs", {
          dogs: this.dogs,
       }).then(response => {
        
       }).catch(err => {
       });
    },
    addNewDog: function(dog) {
      axios.put("/api/addDog", {
        dog: dog,
      }).then(response => {
        console.info("added dog")
       }).catch(err => {
       });
    },
    nextDog: function() {
      console.info("next dog");
      if (this.number < this.max) this.number = this.number + 1;
      console.info("helpppp");
      axios.put("/api/number", {
        number: this.number
      })
      this.getCurrDog();
    },
    addDog: function() {
       axios.post("/api/matches", {
          id: this.number,
          name: this.name,
          img: this.img,
          age: this.age,
          breed: this.dog.breed,
          sex: this.dog.sex,
          size: this.dog.size,
          description: this.dog.description,
       }).then(response => {
        this.nextDog();
       }).catch(err => {
       });
    },
    setDog: function() {
        // this.dog = this.dogs[this.number];
        console.info("setting dog");
        this.name = this.dog.name;

        this.age = this.dog.age;
        this.img = this.dog.img;

    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
}

li a {
  text-decoration: none;
  color: #FF5733;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li {
    float: right;
    padding: 14px 16px;
    text-align: center;
    display: block;
    
}

#active {
  color: grey;
}

a:hover {
  color:grey;
}

.tbg {
    height: 720px;
    width: 400px;
    background-color: #fff;
    margin: 0 auto;
}
.tbgwrap { padding: 10px; }
.theader { height: 75px;  }
.theader i.fa-comments {
    color: #c0c0c0;
    font-size: 40px;
    display: inline-block;
    float: right;
    padding: 10px 20px;
    position: relative;
}
.theader i.fa-cog {
    color: #c0c0c0;
    font-size: 40px;
    display: inline-block;
    float: left;
    padding: 10px 20px;
    position: relative;
}
.tlogo { 
    width: 100px; 
    margin: 0 auto; 
    padding: 10px; 
    color: #FF5733;
    font-size: 30px;  
    margin-bottom: 20px;

}
.tlogo img { width: 100px; }

.tphoto {
    width: 350px;
    height: 350px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    top: 15px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border: 1px solid #c0c0c0;
    padding-bottom: 60px;
    background-color: #fff;
    box-shadow: 2px 2px 2px #c0c0c0;
}
.tphoto img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.tname {
    padding: 15px;
    font-size: 20px;
    font-family: 'Helvetica', sans-serif;
    float: left;
}
.tname .age { font-weight: 200; }
.tinfo { font-family: 'Helvetica', sans-serif; }
.tinfo .fa-users, .tinfo .fa-book {
    color: #c0c0c0;
    float: right;
    position: relative;
    font-size: 24px;
    padding: 12px;
}
.tcontrols {}
.tno {
    background-color: #fff;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -o-border-radius: 50%;
    -ms-border-radius: 50%;
    position: relative;
    display: inline-block;
    top: 50px;
    left: 25px;
    border: 10px solid #f0f0f0;
}
.tno i {
    color: #ff695b;
    font-size: 80px;
    padding: 17px 28px;
}
.ti {
    background-color: #fff;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -o-border-radius: 50%;
    -ms-border-radius: 50%;
    position: relative;
    display: inline-block;
    left: 12px;
    top: 30px;
    border: 10px solid #f0f0f0;
}
.ti .fa-info {
    font-size: 23px;
    padding: 15px 20px;
    color: #398beb;
}
.tyes {
    background-color: #fff;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -o-border-radius: 50%;
    -ms-border-radius: 50%;
    position: relative;
    display: inline-block;
    top: 48px;
    left: 0px;
    border: 10px solid #f0f0f0;
}
.tyes i {
    color: #5de19c;
    font-size: 60px;
    padding: 35px 30px;
}
.light {
  text-decoration: none;
  color: gray;
}
</style>
