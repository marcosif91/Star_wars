import React from 'react';
import Axios from 'axios';
import api from '../Utils/api';
import { Table, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../App.css';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      dataMovies: this.props.dataMovies,
      modal: false,
      movie: null

    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    

  }

  showModal = (item) => {

    this.setState({ modal: true,movie:item });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };


    static getDerivedStateFromProps(props,state) {


      if (props.dataMovies != state.dataMovies){   
        return {     
          dataMovies: props.dataMovies
        }
      }
      return null;
    }





  renderTableMovies() {
    if (this.state.dataMovies !== null ){

      return  this.state.dataMovies.results.map((item,index) => {
          return (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.release_date}</td>
              <td  onClick={ () => this.showModal(item)}>                  
                      <FontAwesomeIcon icon={faInfoCircle} />                                  
                  
              </td>
            </tr>
          )
        })
      }
    }


   render() {


    if (this.state.dataMovies === null ){
      return ('');
    }
    else
    {
    return (
      <div>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>                      
                      <th scope="col">Nombre</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.renderTableMovies()
                    }
                  </tbody>
                </Table>




                <Modal className="modal" show={this.state.modal} onHide={this.hideModal} variant="dark">
                  <Modal.Header closeButton>
                    <Modal.Title>{ this.state.movie === null? '' :  this.state.movie.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <b>Pelicula { this.state.movie === null? '' :  this.state.movie.episode_id}</b>
                    <br/>
                    <b>Director: </b>{ this.state.movie === null? '' :  this.state.movie.director}
                    <br/>
                    <b>Productor: </b>{ this.state.movie === null? '' :  this.state.movie.producer}
                    <br/>
                    <br/>
                    <b>Resumen: </b>
                    { this.state.movie === null? '' :  this.state.movie.opening_crawl}


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="light" onClick={this.hideModal}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
                
      </div> 
             
  );}}
}

export default List;