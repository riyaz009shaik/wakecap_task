import React, {useState, useEffect} from 'react' ;
import axios from 'axios';
import {Link, useParams}  from 'react-router-dom';
import Geocode from "react-geocode";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";

const Building = () => {

    const [building, setBuilding] = useState({
        buildingName: "",
        countryData:{
            id: "",
            name: "",
            position: []
          },
      });

      const { id } = useParams();

      useEffect(() =>{
        loadBuilding();
    }, []);

      const loadBuilding = async () =>{
        const res= await axios.get(`http://localhost:3005/buildings/${id}`);
        setBuilding(res.data);
        debugger;        
       
    }
    var longitude = building.countryData.position[0];
    var  latitude = building.countryData.position[1];

    // const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    //     <GoogleMap
    //       defaultZoom={8}
    //      // defaultCenter={{ lat: -34.397, lng: 150.644 }}
    //     >
    //      <Marker
    //         position={{ lat: longitude, lng:latitude  }}
    //       />
    //     </GoogleMap>
    //   ));

      
    return (

//         <MapWithAMarker
//   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0UmiDR9Ekyj63sw5rFRqMZ9VTLi_PAgA&v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
//         />

       <div className="buidingsList">     
       <span className="list-group-item">{building.buildingName}</span> 
       <span className="list-group-item">{building.countryData.name}</span>
       <span className="list-group-item">{building.countryData.position[0] + ' , ' + building.countryData.position[1]}</span>
       </div>

        
    )
}
export default Building;