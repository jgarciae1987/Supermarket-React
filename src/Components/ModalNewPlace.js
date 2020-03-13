import React, { Component } from 'react';


class ModalNewPlace extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      
    }

    this.inputNewPlace = this.inputNewPlace.bind(this);
    this.formNewPlace = this.formNewPlace.bind(this);
    
  }

  inputNewPlace(e) {
    const name = e.target.value;
    this.setState({
      name: name,
    });
  }

  formNewPlace(e) {
    e.preventDefault();
    this.props.dataNewPlace(this.state.name);
  }

  

  render(){
    return(
      
    <div className="modal fade" id="modal_NewPlace" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">New place</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={ this.formNewPlace }>
            <div className="modal-body">
              <div className="form-group">
                <input type="text" className="form-control" name="name" id="id_name" placeholder="Name" required onChange={ this.inputNewPlace }></input>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    );
  }
}

export default ModalNewPlace;