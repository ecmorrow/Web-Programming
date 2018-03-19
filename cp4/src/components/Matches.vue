
<template>
<div id="app">
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
          <img v-bind:src="match.img"/>
          <label>{{ match.name }}</label>
          <i class="right fa fa-close" aria-hidden="true"></i>
          
        </li>
      </ul>
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
      matches:[],
      ogMatches: [],
      isSmallActive: true,
      isMediumActive: true,
      isBoyActive: true,
      isGirlActive: true,
    }
  },
  created: function() {
    this.getMatches();
  },
  watch: {
  },
  methods: {
    getMatches: function() {
        axios.get("/api/matches").then(response => {
         this.matches = response.data;
         this.ogMatches = this.matches.slice();
         return true;
       }).catch(err => {
       });
    },
    deleteItem: function(item) {
       axios.delete("/api/matches/" + match.id).then(response => {
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

     },
     filterGirls: function() {
        if (this.isGirlActive) {
          this.isGirlActive = false;
          // stop showing girl
          this.filterItems();
          // this.matches = this.matches.filter(function(item) {
          //   return item.sex != "Female";
          // })
        }
        else {
          this.isGirlActive = true;
          // show girl again
          this.filterItems();
        //   for (var i = 0; i < this.ogMatches.length; i++) {
        //     var curr = this.ogMatches[i]; 
        //     if (!this.isSmallActive) {
        //       if (curr.sex === "Female" && curr.size != "Small") this.matches.push(curr);
        //     }
        //     else if (!this.isBigActive) {
        //       if (curr.sex === "Female" && curr.size != "Big") this.matches.push(curr);
        //     }
        //     else if (curr.sex === "Female") this.matches.push(curr);
        //   }
        }
     },
     filterSmall: function() {
        if (this.isSmallActive) {
          this.isSmallActive = false;
          // stop showing small
          this.filterItems();
          // this.matches = this.matches.filter(function(item) {
          //   return item.size != "Small";
          // })
        }
        else {
          this.isSmallActive = true;
          // show small again
          this.filterItems();
          // for (var i = 0; i < this.ogMatches.length; i++) {
          //   var curr = this.ogMatches[i];
          //   console.info(curr.size);
          //   if (!this.isBoyActive) {
          //     if (curr.size === "Small" && curr.sex != "Male") this.matches.push(curr);
          //   }
          //   else if (!this.isGirlActive) {
          //     if (curr.size=== "Small" && curr.sex != "Female") this.matches.push(curr);
          //   }
          //   else if (curr.size === "Small") this.matches.push(curr);
          // }
        }
     },
     filterMedium: function() {
        if (this.isMediumActive) {
          this.isMediumActive = false;
          // stop showing big
          this.filterItems();
          // this.matches = this.matches.filter(function(item) {
          //   return item.size != "Medium";
          // })
        }
        else {
          this.isMediumActive = true;
          // show big again
          this.filterItems();
          // for (var i = 0; i < this.ogMatches.length; i++) {
          //   var curr = this.ogMatches[i];
          //   console.info(curr.size);
          //   if (!this.isBoyActive) {
          //     if (curr.size === "Medium" && curr.sex != "Male") this.matches.push(curr);
          //   }
          //   else if (!this.isGirlActive) {
          //     if (curr.size=== "Medium" && curr.sex != "Female") this.matches.push(curr);
          //   }
          //   else if (curr.size === "Medium") this.matches.push(curr);

          // }
        }
     },
     filterBoys: function() {
        if (this.isBoyActive) {
          this.isBoyActive = false;
          // stop showing boy
          this.filterItems();
          // this.matches = this.matches.filter(function(item) {
          //   return item.sex != "Male";
          // })
        }
        else {
          this.isBoyActive = true;
          // show boy again
          this.filterItems();
          // for (var i = 0; i < this.ogMatches.length; i++) {
          //   var curr = this.ogMatches[i];
          //   if (!this.isSmallActive) {
          //     if (curr.sex === "Male" && curr.size != "Small") this.matches.push(curr);
          //   }
          //   else if (!this.isBigActive) {
          //     if (curr.sex === "Male" && curr.size != "Big") this.matches.push(curr);
          //   }
          //   else if (curr.sex === "Male") this.matches.push(curr);
          }
        }
     },
     
  
}
</script>

<style scoped>
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

#active {
  color: grey;
}

a:hover {
  color:grey;
}

</style>
