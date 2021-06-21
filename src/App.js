import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';
import '../node_modules/moment/moment.js';
import moment from 'moment'
import iconPri1 from './img/alarm-high.svg'
import iconPri2 from './img/alarm-medium.svg'
import iconPri3 from './img/alarm-low.svg'

import data from './fake-api';

class App extends Component {

  constructor(props) {
    super(props)
    this.state={dataIncident:[], dataLocations:[]};
    }


async componentDidMount() {
  // data getLocations
  const getLocData= await data.getLocations();
   this.setState({
    dataLocations:getLocData
   })

   
   // data getIncidentsByLocationId
  const getIncData= await data.getIncidentsByLocationId("airport/t1");
  //console.log(getIncData);
  this.setState({
  dataIncident: getIncData
})
}



  render()
  {
    return(
      <div className="container-fluid padding-r-l-0">
     <div className="p-3 text-white">Incidents</div>
      <table className="table table-stripped table-hover bordered">
  <thead>  
    <tr className="row-title-headings">
    <td className="row theader">
       <div className="col-1 text-center bold">&nbsp;</div>
       <div className="col-2">Date and Time </div>
       <div className="col-1 text-center">ID</div>
       <div className="col-2">Locatio Name</div>
       <div className="col-2">Incident Name</div>
       <div className="col-4">Description</div>
     </td>
    </tr>
  </thead>
  <tbody>
    
    {
         
      this.state.dataIncident.length> 0 && this.state.dataIncident.map((data) => {
        let iconPriPath="";
        switch(data.priority)
        {
          case 1:
            iconPriPath=iconPri1;
          break;
          case 2:
            iconPriPath=iconPri2;
          break;
          case 3:
            iconPriPath=iconPri3;
          break;

          default:
            console.log("invalid value");
        }
       return( 
        <tr key={data.id}>
        <td className="row">
           <div className="col-sm-1 col-md-1 f-r-c"><img src={iconPriPath} alt=""></img></div>
           <div className="col-sm-2 col-md-2 item-list ">{ moment(data.datetime).format("MM/DD/YYYY, HH:MM:SS")}</div>
           <div className="col-sm-1 col-md-1 item-list incident-id">{data.id}</div>
           <div className="col-sm-2 col-md-2 item-list">Location Name</div>
           <div className="col-sm-2 col-md-2  item-list">{data.name}</div>
           <div className="col-sm-4 col-md-4  item-list">this is the description this is the description</div>
         </td>
        </tr>
        )
  }) 
    }
   
  </tbody>
</table>
    </div>
    );
  }
}

export default App;