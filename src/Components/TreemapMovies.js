import React from 'react';
import ReactECharts from 'echarts-for-react';

class TreemapMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      dataTreemap: null
    };


  }

 static getDerivedStateFromProps(props,state) {


  if (props.dataTreemap != state.dataTreemap){   
    return {     
      dataTreemap: props.dataTreemap
    }
  }
  return null;
}

	  render() {

	  	//console.log(this.state.dataTreemap);


	  	if (this.state.dataTreemap === null ){ 
	  		return '';

	  	}
	  	else{

		  	
		  	const options = {
		  		tooltip: {},
			   series: [
			    {
			      type: 'treemap',
			      data: this.state.dataTreemap
			    }
			  ]
			  };

	  		return <ReactECharts option={options} />;
	  		
	  		return '';
		}
	}
}

export default TreemapMovies;