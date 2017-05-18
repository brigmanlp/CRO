// Include React
var React = require("react");
var isEqual = require("lodash.isequal");


// include all of the sub-components
var Form = require("./children/Form");
var Saved = require("./children/Saved");
var Member = require("./children/Member");
var Newuser = require("./children/Newuser");

// Helper for making AJAX requests to the NYT API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // initial state variables
  getInitialState: function() {
    return {
      title:"",
      category:"",
      url:"",
      saved:[]
    };
  },

  // This function allows children to update the parent.
  setParams: function(title, category, url) {
    this.setState({ title: title });
    this.setState({ category: category });
    this.setState({ url: url });
  },

  // // The moment the page renders, get the Articles
  // componentDidMount: function() {
  //   console.log('in componentDidMount');
  //   //get data from model
  //   helpers.getSaved().then(function(saved) {
  //     if (!isEqual(saved,this.state.saved)) {
  //       this.setState({ saved: saved.data });
  //     }
  //   }.bind(this));
  // },

  // The moment the page renders, get the Videos
  componentDidMount: function() {
    console.log('in componentDidMount');
    //get data from model
    helpers.getSaved().then(function(saved) {
      console.log("in helpers.getSaved")
      this.setState({ saved: saved.data });
      console.log(saved)
    }.bind(this));
  },

  // // If the component changes (i.e. if a search is entered)...
  // componentDidUpdate: function() {
  //   console.log('in componentDidUpdate')
  //   // Run the query for the articles
  //   helpers.runQuery(this.state.term, this.state.start, this.state.end).then(function(results) {
  //     if (!isEqual(results, this.state.results)) {
  //       this.setState({results: results});//results from API
  //       return;
  //     }
  //   }.bind(this));
  // },
  // saveItem: function(newVideo) {
  //   helpers.postVideo(newVideo).then(function (response) {
  //   });
  // },

  deleteItem: function(title) {
    helpers.deleteSaved(title).then(function (response) {
    });
  },

  render: function() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <Saved
                  deleteItem={this.deleteItem}
                  saved={this.state.saved} />
              </div>
              <div className="col-md-6">
                <Form
                  setParams={this.setParams} />
              </div>
            </div>
          </div>
        </div>
    );
  }
});


module.exports = Main;
