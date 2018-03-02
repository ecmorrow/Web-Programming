var app = new Vue({
  el: '#app',
  data: {
    loading: true,
    number: 1,
    name: '',
    age:'',
    dogs:[],
    dog:{},
    img:'',
    max: 5,
    response:{},
  },
  created: function() {
    this.xkcd();
  },
  watch: {
    name: function(value) {
        this.name = value;
    },
  },
  methods: {
    xkcd: function() {
        axios({
          method:'get',
          url:'https://api.rescuegroups.org/rest/?key=8oqHMgcE&type=animals&limit=6',
          responseType:'document'
        })
        .then(response => {
            this.response = response;
            this.loading = false;

            this.dogs = response.data.getElementsByTagName("pet");
            this.dog = this.dogs[1];
            this.name = this.dog.getElementsByTagName("name")[0].childNodes[0].nodeValue;

            this.age = this.dog.getElementsByTagName("age")[0].childNodes[0].nodeValue;
            this.img = this.dog.getElementsByTagName("pic1")[0].childNodes[0].nodeValue;
            console.info(this.dog);    

            return true;
        })

    },
    nextDog: function() {
      if (this.number < this.max) this.number = this.number + 1;
      else this.number = 1;
      this.setDog();
    },
    setDog: function() {
        this.dog = this.dogs[this.number];
        console.info(this.dog);
        console.info(this.number);
        this.name = this.dog.getElementsByTagName("name")[0].childNodes[0].nodeValue;

        this.age = this.dog.getElementsByTagName("age")[0].childNodes[0].nodeValue;
        this.img = this.dog.getElementsByTagName("pic1")[0].childNodes[0].nodeValue;

    }
  }
});



