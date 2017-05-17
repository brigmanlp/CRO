// Include React
var React = require("react");
var helpers = require("../utils/helpers.js");
// This is the Saved component. It will be used to show the saved searches and provide a means to delete articles.
var Saved = React.createClass({

  handleDelete: function(event) {
    var selectedParent = event.target.parentNode;
    var title = selectedParent.firstChild.innerHTML;
    this.props.deleteItem(title);
    selectedParent.parentNode.removeChild(selectedParent);
  },

  render: function() {
    return (
      <div className="row">
          <div className="text-center">
            <div className="panel-heading">
              <h3>Saved Videos</h3>
            </div>

            <div className="panel-body text-center">
              {/* use a map function to loop through an array in JSX building a div for each video saved*/}
              {this.props.videos.map(function(video, i) {
                return (
                  <div id={i} key={i} className="well text-left">
                    
                    <a href={video.url} target="blank"><h4>{video.title}</h4></a>
                    <button onClick={this.handleDelete} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                );
              }, this)}
            </div>
          </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
