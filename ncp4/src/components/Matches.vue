
<template>
<!-- <div id="app"> -->
    <div class="header">
      <ul>
        <li><router-link to="/matches" id="active">Matches</router-link></li>
        <li><router-link to="/">Home</router-link></li>
      </ul>
      <h1>My Matches</h1>
      <ul class="buttons">
        <li><button class="btn" v-bind:class="{ act: isGirlActive }" v-on:click="filterGirls">show girls</button></li>
        <li><button class="btn" v-bind:class="{ act: isBoyActive }" v-on:click="filterBoys">show boys</button></li>
        <li><button class="btn" v-bind:class="{ act: isMediumActive }" v-on:click="filterMedium">show medium dogs</button></li>
        <li><button class="btn" v-bind:class="{ act: isSmallActive }" v-on:click="filterSmall">show small dogs</button></li>
      </ul>
      

      <ul>
        <li class="match" v-for="match in matches">
          <img v-bind:src="match.img" class="click" v-on:click="showInfo(match)"/>
          <label class="click" v-on:click="showInfo(match)">{{ match.name }}</label>
          <i v-on:click="deleteItem(match)" class="right fa fa-close" aria-hidden="true"></i>
          
        </li>
      </ul>
      <div v-if="seen">
        <div id="light" class="white_content">
          <a class="rright" v-on:click="unsee">Close</a>
          <h1>Dog Info</h1>
          <p>Name: {{ currMatch.name }}</p>
          <p>Age: {{ currMatch.age }}</p>
          <p>Gender: {{ currMatch.sex }}</p>
          <p>Size: {{ currMatch.size }}</p>
        </div>
        <div  id="fade" class="black_overlay"></div>
      </div>
    </div>


  <!-- </div> -->
</template>

<script>
import axios from 'axios';


export default {
  name: 'Swipe',
  data () {
    return {
      matches:[],
      ogMatches: [],
      isSmallActive: true,
      isMediumActive: true,
      isBoyActive: true,
      isGirlActive: true,
      seen: false,
      currMatch: {},
    }
  },
  created: function() {
    this.getMatches();
  },
  watch: {
  },
  methods: {
    unsee: function() {
      this.seen = false;
    },
    showInfo: function(match) {
      console.info(this.seen);
      this.currMatch = match;
      this.seen = true;
    },
    getMatches: function() {
        axios.get("/api/matches").then(response => {
         this.matches = response.data;
         this.ogMatches = this.matches.slice();
         return true;
       }).catch(err => {
       });
    },
    deleteItem: function(item) {
       axios.delete("/api/matches/" + item.id).then(response => {
         this.getMatches();
         return true;
       }).catch(err => {
       });
     },
     filterItems: function() {
      if (this.isBoyActive && this.isGirlActive) {
        // do nothing
        this.matches = this.ogMatches.slice();
      }
      else if (this.isSmallActive && this.isMediumActive) {
        // do nothing
        this.matches = this.ogMatches.slice();
      }
      else if (!this.isBoyActive && this.isGirlActive && !this.isSmallActive && !this.isMediumActive){
        // only show girls
        this.matches = this.ogMatches.filter(function(item) {
            return item.sex == "Female";
          })
      }
      else if (this.isBoyActive && !this.isGirlActive && !this.isSmallActive && !this.isMediumActive) {
        // only show boys
        this.matches = this.ogMatches.filter(function(item) {
            return item.sex == "Male";
          })
      }
      else if (!this.isBoyActive && !this.isGirlActive && this.isSmallActive && !this.isMediumActive){
        //only show small
        this.matches = this.ogMatches.filter(function(item) {
            return item.size == "Small";
          })
      }
      else if (!this.isBoyActive && !this.isGirlActive && !this.isSmallActive && this.isMediumActive) {
        // only show medium
        this.matches = this.ogMatches.filter(function(item) {
            return item.size == "Medium";
          })
      }
      else if (!this.isBoyActive && this.isGirlActive && !this.isSmallActive && this.isMediumActive) {
        // only show medium and girl
        this.matches = this.ogMatches.filter(function(item) {
            return (item.sex == "Female" && item.size =="Medium");
          })
      }
      else if (this.isBoyActive && !this.isGirlActive && !this.isSmallActive && this.isMediumActive) {
        // only show medium and boy
        this.matches = this.ogMatches.filter(function(item) {
            return (item.sex == "Male" && item.size =="Medium");
          })
      }
      else if (!this.isBoyActive && this.isGirlActive && this.isSmallActive && !this.isMediumActive) {
        // only show small and girl
        this.matches = this.ogMatches.filter(function(item) {
            return (item.sex == "Female" && item.size =="Small");
          })
      }
      else if (this.isBoyActive && !this.isGirlActive && this.isSmallActive && !this.isMediumActive) {
        // only show small and boy
        this.matches = this.ogMatches.filter(function(item) {
            return (item.sex == "Male" && item.size =="Small");
          })
      }
      else if (!this.isBoyActive && !this.isGirlActive && !this.isSmallActive && !this.isMediumActive) {
        // only show small and boy
        this.matches = this.ogMatches.filter(function(item) {
            return (item.sex == "M");
          })
      }

     },
     filterGirls: function() {
        if (this.isGirlActive) {
          this.isGirlActive = false;
        }
        else {
          this.isGirlActive = true;
        }
         this.filterItems();
     },
     filterSmall: function() {
        if (this.isSmallActive) {
          this.isSmallActive = false;
        }
        else {
          this.isSmallActive = true;
        }
        this.filterItems();
     },
     filterMedium: function() {
        if (this.isMediumActive) {
          this.isMediumActive = false;
        }
        else {
          this.isMediumActive = true;
        }
        this.filterItems();
     },
     filterBoys: function() {
        if (this.isBoyActive) {
          this.isBoyActive = false;
        }
        else {
          this.isBoyActive = true;
          }
          this.filterItems();
        }
        
     },
     
  
}
</script>

<style scoped>

.black_overlay {
  display: block;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: .80;
  filter: alpha(opacity=80);
}
.white_content {
  display: block;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  padding: 16px;
  background-color: white;
  z-index: 1002;
  overflow: auto;
}

.header {
  width: 100%;
}

.btn {
  /*color: #fff;*/
  cursor: pointer;
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 1px;
  position: relative;
  border-radius: 25px;
  color: #FF5733;
  border: 1px solid #FF5733;
  background-color: white;
}

.act {
  background-color:#FF5733;
  color: white;
  cursor: pointer;
  padding: 5px 20px;
  display: inline-block;
  letter-spacing: 1px;
  position: relative;
  border-radius: 25px;
  border: 1px solid #FF5733;
}
button:focus {outline:0;}

i {
  cursor: pointer;
}

.buttons li {
  display: inline-block;
  float: none;
  margin: 0 auto;
}

/*.btn:hover {
  color: #FF5733;
  border: 1px solid #FF5733;
  background-color: white;
  border-radius: 25px;
}*/

.rright {
  float: right;
}

.right {
  /*text-align: right;*/
  float: right;
  margin-right: 30px;
  vertical-align: middle;
  line-height: 45px;
  color: gray;
}

.match {
  width: 100%;
  background-color: #F1F1F1;
  margin: 3px;
  text-align: left;
  float: left;
}

.match label {
  vertical-align: middle;
}

.match img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
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

.click {
  cursor:pointer;
}


#active {
  color: grey;
}

a:hover {
  color:grey;
}

</style>
