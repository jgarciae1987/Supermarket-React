import React, { Component } from 'react';

class NewItem extends Component {
  constructor() {
    super();

    this.state = {
      name        : "",
      description : "",
      quantity    : "",
    }

    this.inputNewItem = this.inputNewItem.bind(this);
    this.formNewItem = this.formNewItem.bind(this);
  }

  inputNewItem(e) {
    const { value, name } = e.target;
		this.setState({
			[name]: value 
    });
  }

  formNewItem(e) {
    e.preventDefault();
    this.props.dataNewItem(this.state.name, this.state.description, this.state.quantity);
  }
  
  render() {
    return(

        <form onSubmit={this.formNewItem}>
          <div className="form-group row">
          <div className="col-sm-3">
              <input type="text" className="form-control form-control-sm" name="name" placeholder="Name" required onChange={ this.inputNewItem }></input>
            </div>
            <div className="col-sm-3">
              <input type="text" className="form-control form-control-sm" name="description" placeholder="Description"  onChange={ this.inputNewItem }></input>
            </div>
            <div className="col-sm-3">
              <input type="text" className="form-control form-control-sm" name="quantity" placeholder="Quantity" required onChange={ this.inputNewItem }></input>
            </div>
            <button type="submit" className="btn btn-outline-dark btn-sm col-sm-1">
            <i className="far fa-save"></i> 
            </button>
          </div>
        </form>
 
    );
  }
  
}

export default NewItem;