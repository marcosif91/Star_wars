import React from 'react';
import './App.css';
import List from './Components/List.js';
import Axios from 'axios';
import api from './Utils/api';
import TreemapMovies from './Components/TreemapMovies.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      dataMovies: null,
      dataTreemap: null
    };


  }





    componentDidMount(){      

      this.setState({ cargando:false});
      Axios.get(api.url + api.movies.all)
          .then(response => {         
            
            var data = [];

            if (response.data.results !== null ){




            // ITERO LAS PELICULAS
            response.data.results.map((item,index) => {
                var objeto = {};
                
               
                objeto.name = item.title;
                objeto.value = item.characters.length;
                objeto.children = [];
                response.data.results.characters2 = [];


                // ITERO LOS PERSONAJES
                item.characters.map((item_c,index_c) => {
                    response.data.results[index].characters2 = [];

                      Axios.get(item_c)
                       .then(response_ => { 



                            var children = {};
   
                            


                            children.name = response_.data.name;
                            children.value = 1;    
                            
                            objeto.children.push(children);
                            response.data.results[index].characters2.push(response_.data);


                       })
                      .catch(function (error_){            
                          console.log(error_);
                          })
                      .then(r_ => {                     
                          

                          
                      });    


                })


                data.push(objeto);


            })           

            
          }


              this.setState({ dataMovies: response.data, dataTreemap:data, cargando:false})


              


          })
          .catch(function (error){            
              console.log(error);
              })
          .then(r => {
             
              this.setState({ cargando: false  })

              
          });
        }
   


  render() {

    if (this.state.cargando)
    {
      return 'Cargando...';

    }
    else{

    return (
      <div className="App">
        <br/>
        <br/>
        <h1>Películas de Star Wars</h1>
        <br/>
        <div className="outer-table">
          <div className="inner-table">
            <List dataMovies={this.state.dataMovies} />
          </div>
        </div>
        <br/>
        <h4>Personajes por película</h4>
        <TreemapMovies dataTreemap={this.state.dataTreemap} /> 


      </div>
    );
  }}
}

export default App;
