import React, {useState} from 'react'
import Countries from '../data/countriesList.json';

import axios from 'axios';
import {useHistory}  from 'react-router-dom';


const AddBuilding = () => {
  
 
       let history = useHistory();
      const  clientID = localStorage.getItem('clientId');
    const [building, setBuilding] = useState({
      buildingName: "",
      clientId: clientID,
      countryData: {}
    });

    const {buildingName, countryData:{}  } = building;

     const inputChange = e => {
       console.log(e.target.value);
       console.log(e.target); 

      setBuilding ({...building,[e.target.name]: e.target.value})
     };

     const handleChange = e => {
      let obj = JSON.parse(e.target.value);
      setBuilding ({...building,[e.target.name]: obj})
     };
        var message ;
    const onSubmit = async e => {
              e.preventDefault();
              const result =  await axios.post("http://localhost:3005/buildings", building);
             if ( result.status = 201){
               message = "Data saved successfully";
             }
             else{
              message = "An error occured please try again";
             }
     
              //history.push("/");
          
              
    };


return (
    <div className="addBuilding">
    <form onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input type="text" className="form-control" required
           id="buildingName" 
           name="buildingName"
           value={buildingName}
          placeholder="Enter Building Name" 
          onChange={e => inputChange(e)}
            />
         
        </div>
        <div className="form-group">
            <label htmlFor="countryData">Location</label>
               <select className="form-control"  required
               name="countryData"
               id="countryData"
            
                onChange={e => handleChange(e)}>
                 {
                     Countries.map(country =>(
                        <option name="countryData" value={JSON.stringify(country)}>{country.name}</option>                        
                     ))                     
                 }  
                 
                </select> 
        </div>
        
       <button type="submit" className="btn btn-sucess">Submit</button>

       <div>
         <p>{message}</p>
       </div>
     </form>
     </div>
)
}

export default AddBuilding;