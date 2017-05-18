var React = require("react");
var helpers = require("../utils/helpers.js");

var Form = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var newVideo = {
      title: $("#title").val(),
      category: $("#category").val(),
      url: $("#url").val(),
    }
    helpers.postVideo(newVideo)
  },

  render: function() {
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center">Enter New Video</h3>
        </div>

        <div className="panel-body text-center">
          <form >

            <div className="form-group">
              <label htmlFor="title">
                <strong>Title:</strong>
              </label>
              <input type="text"
                className="form-control text-center"
                id="title"
                // onChange={this.handleChangeTerm}
                required />
              <br />
            </div>

              <div className="form-group">
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" 
                className="form-control text-center" 
                id="category"
                // onChange={this.handleChangeStart}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url"><strong>URL:</strong></label>
                <input type="text" 
                className="form-control text-center" 
                id="url"
                // onChange={this.handleChangeStart}
                />
              </div>
              <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-md">Add Video</button>
          </form>
        </div>
      </div>

    );
  }
});

module.exports = Form;
