import React, {useState, useEffect} from 'react'
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import deleteIcon from '../../images/deleteIcon.png';
import edit from '../../images/edit.png';
import view from '../../images/view.jpg';

const clientOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 1,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 2,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 3,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Chris',
    text: 'Chris',
    value: 4,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 5,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 6,
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
  },
]



const Home = () => {
    
    const [buildings, setBuilding] = useState([]);

    useEffect(() =>{
        //getClientData();
    }, []);

        const getClientData =  async (e, data) => {
         const clientID = data.value;         
           localStorage.setItem('clientId', clientID);
           const result = await axios.get("http://localhost:3005/buildings?clientId=" + data.value);
            setBuilding(result.data.reverse());
            
       };
       

       const deleteBuilding = async building => {
            await axios.delete(`http://localhost:3005/buildings/${building.id}`);

            const getRemaining = await axios.get("http://localhost:3005/buildings?clientId=" + building.clientId);
            setBuilding(getRemaining.data.reverse());
       }
    

    return (
    <div className="selectUser">
        <div className="dropdown">
                 <Dropdown className="col-md-4 offset-md-4"
                   placeholder='Select Client'
                   fluid
                   selection
                   options={clientOptions}
                   onChange={getClientData}
                 />
         </div>

             <div>             
                <ul className="list-group">      
                {
                        buildings.map((building) => (                                       
                    <li className="list-group-item"><h6>{building.buildingName}</h6>
                    <div className="imgDiv">
                     <div><Link to={`/building/${building.id}`} title="View Building" className=""><img src={view}/></Link></div>
                    <div><Link to={`/building/edit/${building.id}`} title="Edit Building" className=""><img src={edit}/></Link></div>
                    <div><span  title="Delete Building" className="" onClick={() => {if(window.confirm('Are you sure want to delete this building?')){ deleteBuilding(building)};}}><img src={deleteIcon}/> </span></div>
                    </div>
                    </li> 
                    
                    ))                     
                }                 
                </ul>                
                    
                 <Link to='/building/add' className="btn">Add  Building</Link>     
             </div>                            
             </div>   
  
);
  
};



export default Home;
