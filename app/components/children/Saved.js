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
    helpers.deleteSaved($(this).data("id").val())
  },

  render: function() {
    return (
      <div className="row ">
          <div className="text-center panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Saved Videos</h3>
            </div>

            <div className="panel-body text-center">
              {/* use a map function to loop through an array in JSX building a div for each video saved*/}
              {this.props.saved.map(function(video, i) {
                return (
                  <div id={i} key={i} className="text-left videoDiv">
                    <button onClick={this.handleDelete} className="btn btn-primary btn-md">Delete</button>
                    <a href={video.url} target="_blank"><h4 className="videoLink">{video.title}</h4></a>

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
