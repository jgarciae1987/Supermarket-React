import React, { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      item_id_edit: null,
      item_name_edit: '',
      item_quantity_edit: 0,
      name        : "",
      description : "",
      quantity    : "",
    };

    Axios.get('http://supermarket_api.local/api/items/myItems/'+ this.props.place.id +'.json')
    .then((response) => {
      let data = response.data;
      this.setState({
        items: data.items,
      });
    });
    
    this.deleteItem = this.deleteItem.bind(this);
    this.openModalEditItemSetState = this.openModalEditItemSetState.bind(this);
    this.inputEditItem = this.inputEditItem.bind(this);
    this.formEditItem = this.formEditItem.bind(this); 
    this.inputNewItem = this.inputNewItem.bind(this);
    this.formNewItem = this.formNewItem.bind(this);
    this.closeBox = this.closeBox.bind(this);
  }

  closeBox(idPlace) {
    console.log(idPlace);
    this.props.dataDeleteBox(idPlace);
  }

  deleteItem(id, idx) {
    Axios.post('http://supermarket_api.local/api/items/deleteItem/'+ id +'.json')
    .then((response) => {
      var data = response.data;
      if(data.success === false){
        return;
      } 
      const items = this.state.items.filter((item, i) => {
        return i !== idx;
      })
      this.setState({
        items: items,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    console.log('deleteItem');
    console.log(this.state);
  }

  openModalEditItemSetState(item, idx) {
    console.log(item);
    
    this.setState({
      item_id_edit: item.id,
      item_name_edit: item.name,
      item_quantity_edit: item.quantity,
    });
    console.log(this.state);
  }

  inputEditItem(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    }); 
    console.log(this.state); 
  }

  formEditItem(e) {
    e.preventDefault();
    var item_id = this.state.item_id_edit;
    var item_name = this.state.item_name_edit;
    var item_quantity = this.state.item_quantity_edit;

    const idx = this.state.items.findIndex((item) => {
      return item.id === item_id;
    })
    
    Axios.post('http://supermarket_api.local/api/items/editItem/'+ item_id +'.json', { name: item_name, description: "", quantity: item_quantity} )
    .then((response) => {

      const items = this.state.items.slice();
      items[idx].name = item_name;
      items[idx].quantity = item_quantity;

      this.setState({
        items: items,
      });

      $('#edit-item-modal-'+this.props.place.id).modal('hide');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  inputNewItem(e) {
    const { value, name } = e.target;
		this.setState({
			[name]: value,
    });
    //console.log(this.state);
  }

  formNewItem(e) {
    e.preventDefault();

    Axios.post('http://supermarket_api.local/api/items/addItem/'+ this.props.place.id +'.json', {name: this.state.name, description: "", quantity: this.state.quantity})
    .then((response) => {
      var data = response.data;
      this.setState({
        items: this.state.items.concat(data.item),
      });
    })
    .catch((error) => {
      console.log(error);
    })
    console.log('saveNewItem');
    console.log(this.state);
  }


  render() {

    const items = this.state.items.map((item, idx) => {
      return (
        <tr key={idx} style={{fontSize: "11px"}}>
          <td>{ item.name }</td>
          {/* <td>{ item.description }</td> */}
          <td>{ item.quantity }</td>
          <td>
            <button className="btn btn-sm btn-outline-danger btn-circle" onClick={ (e) => { if(window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(item.id, idx) }}>
              <i className="far fa-trash-alt"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-sm btn-outline-warning btn-circle" data-toggle="modal" data-target={'#edit-item-modal-'+this.props.place.id}  onClick={ (e) => this.openModalEditItemSetState(item, idx) }>
              <i className="far fa-edit"></i>
            </button>
          </td>
        </tr>
      );
    });

    return( 
      <>
      <div className="col col-md-6 p-1">
        <div className="card">
          <div className="card-header" style={{backgroundColor: "#eee"}}>
            <div className="row">
              <div className="col col-md-10">
                { this.props.place.name }
              </div>
              <div className="col col-md-2 text-center">
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={(e) => { this.closeBox(this.props.place.id) }}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={this.formNewItem }>
              <div className="form-group row">
              <div className="col-sm-7 m-0 p-0">
                  <input type="text" className="form-control form-control-sm" name="name" placeholder="Name" required onChange={ this.inputNewItem }></input>
                </div>
                {/* <div className="col-sm-3">
                  <input type="hidden" className="form-control form-control-sm" name="description" placeholder="Description"  onChange={ this.inputNewItem }></input>
                </div> */}
                <div className="col-sm-3 m-0 p-0">
                  <input type="text" className="form-control form-control-sm" name="quantity" placeholder="Quantity" required onChange={ this.inputNewItem }></input>
                </div>
                <button type="submit" className="btn btn-outline-dark btn-sm btn-block col-sm-2 m-0 p-0">
                <i className="far fa-save"></i> 
                </button>
              </div>
            </form>

            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Name </th>
                  {/* <th>Desct</th> */}
                  <th style={{width: "5%"}}>Qty</th>
                  <th style={{width: "5%"}}></th>
                  <th style={{width: "5%"}}></th>
                </tr>
              </thead>
              <tbody>
                {  items }
              </tbody>
            </table>

          </div>
        </div>
      </div>


      {/* inicio de modal edita item */}
      <div className="modal fade" id={'edit-item-modal-'+this.props.place.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content" id="abre">
          <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit item </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={ this.formEditItem  }>
          <div className="modal-body">

            <div className="form-group">
              <input type="text" className="form-control" name="item_name_edit" placeholder="Name" required onChange={ this.inputEditItem } value={ this.state.item_name_edit } ></input>
            </div>

            <div className="form-group">
              <input type="hidden" className="form-control" name="item_description_edit" placeholder="Description" required onChange={ this.inputEditItem } value={ this.state.item_description_edit }></input>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" name="item_quantity_edit" placeholder="Quantity" required onChange={ this.inputEditItem } value={ this.state.item_quantity_edit } ></input>
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
      {/* fin de modal edita item */}
      </>
    );
  }
}

export default Box;