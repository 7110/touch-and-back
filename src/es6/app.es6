var Vue = require('vue');
var axios = require('axios');
var querystring = require('querystring');

new Vue({
  name: "transfer",
  el: '#app',
  data: {
    status: undefined,
    show: false,
    from: undefined,
    to: undefined,
    // from: "都賀",
    // to: "鹿島神宮",
    result: undefined,
    // result: {
    //   "departure": "18:18",
    //   "arrival": "19:57",
    //   "required": "1時間39分",
    //   "day": "25",
    //   "departure2": "20:09",
    //   "arrival2": "21:38",
    //   "required2": "1時間29分"
    // }
  },
  methods: {
    post: function() {
      this.status = "Loading";
      this.result = undefined;
      axios.post(
        'http://127.0.0.1:2000/api/touch-and-back.php',
        querystring.stringify({
          from: encodeURI(this.from),
          to: encodeURI(this.to)
        })
      )
      .then(response => {
        let data = response.data;
        this.result = data;
        data.required ? this.status = "OK": this.status = "None";
      })
      .catch(error => {
        // console.log(error);
        this.status = "Error";
      });
    }
  },
  watch: {
    status: function() {
      if (this.status == "OK") {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(this.status);
    },
    from: function() {
      this.status = undefined;
    },
    to: function() {
      this.status = undefined;
    }
  },
});
