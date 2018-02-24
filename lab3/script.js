Vue.component('star-rating', VueStarRating.default);

var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max:'',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
    rating:0,
  },
  created: function() {
    this.xkcd();
  },
  computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
	return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },

  watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
		this.max = value;
      } else {
		this.xkcd();
      }
    },
  },
  methods: {
    xkcd: function() {
      fetch('https://xkcd.now.sh/' + this.number).then(response => {
		return response.json();
      }).then(json => {
		this.current = json;
		this.loading = false;
		this.number = json.num;
		if (this.ratings[this.number] == null) this.rating = 0;
		return true;
      }).catch(err => {
      	this.number = this.max;
      });

    },
    previousComic: function() {
      this.number = this.current.num - 1;
      // this.rating = this.ratings[this.number].avg;
    },
    nextComic: function() {
      this.number = this.current.num + 1;
      // this.rating = this.ratings[this.number].avg;
      // console.info(rating);
    },
 	getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    randomComic: function() {
      this.number = this.getRandom(0,this.max);
      // this.rating = this.ratings[this.number].avg;
    },
    addComment: function() {
     	if (!(this.number in this.comments))
			Vue.set(app.comments, this.number, new Array);
		var currentDate = new Date()
		date = currentDate.toLocaleString();
		this.comments[this.number].push({author:this.addedName,text:this.addedComment,date:date});
		this.addedName = '';
		this.addedComment = '';
    },
    addRating: function(rating) {
    	// console
    	// if (!(this.number in this.ratings))
    	// 	Vue.set(app.ratings, this.number, new Array);
    	if (this.ratings == null) this.ratings == new Array();
    	oldRating = this.ratings[this.number];
    	if (oldRating == null) 
    		this.ratings[this.number] = {num:1,avg:rating};

    	else {
	    	num = oldRating.num;
	    	avg = oldRating.avg;
	    	newAvg = (avg + rating) / (num + 1);
	    	console.info(newAvg);
	    	this.ratings[this.number] = {num:num+1,avg:newAvg};
	    	this.rating = newAvg;
   	 	}
    },
    lastComic: function() {
    	console.info(this.max);
    	this.number = this.max;
    	// this.rating = this.ratings[this.number].avg;
    },
    firstComic: function() {
    	this.number = 1;
    	// this.rating = this.ratings[this.number].avg;
    },
  }
});



