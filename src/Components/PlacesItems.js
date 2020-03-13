import React, { Component } from 'react';
import Axios from 'axios';
import ModalNewPlace from './ModalNewPlace';
import Box from './Box';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class PlacesItems extends Component {
  constructor() {
    super();

    this.state = {
      places: [],
      box_places: [],
      place_id: null,
      place_name: '',
      place_id_edit: null,
      place_name_edit: '',
    };

    Axios.get('http://supermarket_api.local/api/places/myPlaces.json')
    .then((response) => {
      var data = response.data;
      this.setState({
        places: data.places,
      });      
    })
    .catch((error) => {
      console.log(error);
    })

    this.showBoxes = this.showBoxes.bind(this);
    this.saveNewPlace = this.saveNewPlace.bind(this);
    this.inputEditPlace = this.inputEditPlace.bind(this);
    this.formEditPlace = this.formEditPlace.bind(this);
    this.openModalEditPlaceSetState = this.openModalEditPlaceSetState.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
    
    console.log('Constructor');
    console.log(this.state);
  }

  showBoxes(place_id, place) {
    // revisar si ya esta en el state
    var idx = this.state.box_places.findIndex((boxPlace) => {
      return boxPlace.id === place_id;
    });
    if ( idx >= 0 ) {
      return;
    }
    
    var arrayBoxes = this.state.box_places.concat([{id: place_id, name:place}]);
   
    this.setState({
      box_places: arrayBoxes,
    });
  }

  deletePlace(id, idx) {
    Axios.post('http://supermarket_api.local/api/places/deletePlace/'+ id +'.json')
    .then((response) => {
      const places = this.state.places.filter((place, i) => {
        return i !== idx;
      })

      const box_places = this.state.box_places.filter((box_place, j) => {
        return j !== idx;
      });

      this.setState({
        places: places,
        items: [],
        place_id: null,
        place_name: '',
        box_places: box_places,
      });      
    })
    .catch((error) => {
      console.log(error);
    })
    
    console.log('deletePlace');
    console.log(this.state);
  }

  saveNewPlace(name){
    Axios.post('http://supermarket_api.local/api/places/addPlace.json', { name : name})
    .then((response) => {
      var data = response.data;
      this.setState({
        places: this.state.places.concat(data.place),
      });

      $('#modal_NewPlace').modal('hide');
    })
    .catch((error) => {
      console.log(error);
    })  
    console.log('saveNewPlace');
    console.log(this.state);
  }
  
  openModalEditPlaceSetState(id, name) {
    this.setState({
      place_id_edit: id,
      place_name_edit: name,
    });
  }

  inputEditPlace(e) {
    const name = e.target.value;
    this.setState({
      place_name_edit: name,
    });
  }

  formEditPlace(e) {
    e.preventDefault();
    var id = this.state.place_id_edit;
    var name = this.state.place_name_edit;

    //toma el index del arreglo que corresponde al id
    const idx = this.state.places.findIndex((place) => {
      return place.id === id;
    })  
    
    Axios.post('http://supermarket_api.local/api/places/editPlace/'+ id+'.json', {name: name})
    .then((response) => {
      var data = response.data;
      if(data.success === false){
        return;
      }

      //creamos un arreglo completo de places 
      const places = this.state.places.slice();
      //editamos la posicion
      places[idx].name = name;

      this.setState({
        places: places,
      });

      $('#modal_EditPlace').modal('hide');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deleteBox(idPlace) {
    var idx = this.state.box_places.findIndex((place) => {
      return place.id === idPlace;
    })
    
    const box_places = this.state.box_places.filter((box_place, i) => {
      return i !== idx;
    })

    this.setState({
      box_places: box_places,
    });
  }

  render() {
    
    const allMyPlaces = this.state.places.map((place, idx) => {
      return(
        <div key={idx}>

          <button className="btn btn-outline-info  btn-sm"  onClick={(e) => this.showBoxes(place.id, place.name)} style={{width: "60%"}}>
            { place.name }
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={ (e) => { if (window.confirm('Are you sure you wish to delete this place?')) this.deletePlace(place.id, idx) }}  style={{width: "20%"}} >
            <i className="far fa-trash-alt"></i>
          </button>
          <button className="btn btn-outline-warning  btn-sm" onClick={ (e) => this.openModalEditPlaceSetState(place.id, place.name) } data-toggle="modal" data-target="#modal_EditPlace" style={{width: "20%"}}>
            <i className="far fa-edit"></i>
          </button>
        </div>
      );
    });

    const boxesPlaces = this.state.box_places.map((place, i) => {
      // <NewItem  dataNewItem={ this.saveNewItem } />
      return <Box key={i} place={place} dataDeleteBox={ this.deleteBox } /> 
    });

    return (
      <div>
        
        <div className="row p-0 m-0">

            <div className="col-md-3 p-1" style={{border: "1px solid #eee"}}>
              <button className="btn btn-outline-dark btn-block btn-sm" data-toggle="modal" data-target="#modal_NewPlace">
                <i className="fas fa-plus"></i> Add place
              </button>
              <ModalNewPlace dataNewPlace={ this.saveNewPlace }/>
              <hr></hr>

              { allMyPlaces }
            </div>

            <div className="col-md-9 p-1" style={{border: "1px solid #eee"}}>
              <div className="row m-0">
                { 
                  this.state.box_places.length ?
                    boxesPlaces :
                    <p>Bienvenido</p>
                }
              </div>
            </div>

            {/* inicio de modal edita place */}
            <div className="modal fade" id="modal_EditPlace" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content" id="abre">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit place </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={ this.formEditPlace }>
                <div className="modal-body">
                  <div className="form-group">
                    <input type="text" className="form-control" name="name" id="id_name" placeholder="Name" required onChange={ this.inputEditPlace } value={ this.state.place_name_edit }></input>
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
            {/* fin de modal edita place */}


            

        </div>


      </div>
    );
  }
}

export default PlacesItems;