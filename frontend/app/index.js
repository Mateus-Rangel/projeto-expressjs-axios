// import axios from "./node_modules/axios";
// import axios from "axios";
// const axios = require('axios').default;

axios({
  method: "get",
  url: "http://localhost:3000/",
}).then(function (response) {
  const result = (document.getElementById("result").innerHTML = response.data);
});
