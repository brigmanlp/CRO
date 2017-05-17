var React = require("react");

var Form = React.createClass({

  getInitialState: function() {
    return { title: "Title", category:"Category", url:"URL" };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    // Set the parent to have the search term
    console.log('in handleSubmit',this.state.title,this.state.category, this.state.url);
    this.props.setParams(this.state.title,this.state.category, this.state.url);
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
              <input value={this.state.title} type="text"
                className="form-control text-center"
                id="title"
                // onChange={this.handleChangeTerm}
                required />
              <br />
            </div>

              <div className="form-group">
                <label htmlFor="category"><strong>Category:</strong></label>
                <input value={this.state.category} type="text" 
                className="form-control text-center" 
                id="category"
                // onChange={this.handleChangeStart}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url"><strong>URL:</strong></label>
                <input value={this.state.url} type="text" 
                className="form-control text-center" 
                id="url"
                // onChange={this.handleChangeStart}
                />
              </div>
              <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-md">Search</button>
          </form>
        </div>
      </div>

    );
  }
});

module.exports = Form;
