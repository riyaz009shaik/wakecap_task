import React, {useState, useEffect} from 'react'
import Countries from '../data/countriesList.json';
import axios from 'axios';
import {useHistory, useParams}  from 'react-router-dom';


const EditBuilding = () => {
  
       let history = useHistory();
       const {id} = useParams();
      
      const  clientID = localStorage.getItem('clientId');
    const [building, setBuilding] = useState({
      buildingName: "",
      clientId: clientID,
      countryData: {}
    });

    const {buildingName,countryData:{} } = building;

     const inputChange = e => {
      setBuilding ({...building,[e.target.name]: e.target.value})
     };

     const handleChange = e => {
        let obj = JSON.parse(e.target.value);
        setBuilding ({...building,[e.target.name]: obj})
       };

    useEffect(() =>{
        loadBuilding();
    }, []);
  
    var message ;
    const onSubmit = async e => {
              e.preventDefault();
              const result = await axios.put(`http://localhost:3005/buildings/${id}`, building);
              debugger;
              if ( result.status = 201){
                message = "Data updated successfully";
              }
              else{
               message = "An error occured please try again";
              }
              history.push("/");
    };

    const loadBuilding = async () =>{
        const result= await axios.get(`http://localhost:3005/buildings/${id}`);
        setBuilding(result.data);
    }
return (
    <div className="editBuilding">
    <form onSubmit={ e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input type="text" className="form-control"
           id="buildingName" 
           name="buildingName"
           value={buildingName}
          placeholder="Enter Building Name" 
          onChange={e => inputChange(e)}
            />
         
        </div>
        <div className="form-group">
            <label htmlFor="countryData">Location</label>
               <select className="form-control" 
               name="countryData"
               id="countryData"   
               
                onChange={e => handleChange(e)}>
                 {
                     Countries.map(country =>(
                        <option name="countryData" value={JSON.stringify(country)} >{country.name}</option>                        
                     ))                     
                 }  
                 
                </select> 
        </div>
        
       <button type="submit" className="btn btn-warning">Update Building</button>
     </form>
     </div>
)
}

export default EditBuilding;