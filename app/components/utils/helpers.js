var axios = require("axios");

var helpers = {

  // runQuery: function(term, start, end){
  //   var term = term.trim();
  //   var start = start.trim() + "0101";
  //   var end = end.trim() + "1231";

  //   console.log("\nin runQuery",term,start,end);
  //   return axios.get('/api/search/' + term + '/' + start + '/' + end )
  //   .then(function(response){
  //     console.log("\nAxios Response from NYT query", response.data.response.docs);
  //     return response.data.response.docs;
  //   })
  // },

  getSaved: function(){
    return axios.get('/api/retrieve')
      .then(function(response){
        console.log("axios response from /api/retrieve", response);
        return response;
      })
  },

  postVideo: function(newVideo){
    console.log('Added Video:', newVideo);
    return axios.post('/api/saveVid', {video: newVideo})
      .then(function(response){
        console.log("helpers.postVideo axios response ", response._id);
        return response._id;
      })
  },

  deleteSaved: function(id) {
    return axios.delete('/api/delete/'+ id);
  }
}

module.exports = helpers;
