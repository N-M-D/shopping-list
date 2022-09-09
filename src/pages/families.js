import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom'

const Families = () => {
    const token = localStorage.getItem("token");
    const heroku = `https://chua-shopping.herokuapp.com`;

    const [families, setFamilies] = useState([]);

    function createFamily(e) {
        e.preventDefault();
        fetch(`${heroku}/family`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
        })
    }

    function getFamilies(){
        fetch(`${heroku}/families`, {
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setFamilies(response.rows)
            
        })
    }

    useEffect(() => {
        getFamilies();
    }, [])

    return ( 
        <div className="container">
            <h1>Family</h1>
            <button className="btn btn-primary" onClick={createFamily}>Create Family</button>
            <h2>My Families</h2>
            <div className="family-group" style={{border: "1px solid black"}}>
                {
                    families.map((family) => (
                        <div className="familySelect" style={{backgroundColor: "grey", padding: "1em 0", border: "1px solid #222"}} key={family.familyID}>
                            <Link to={`/family/${family.familyID}`} className="familySelect" >
                                <h4>{family.name}</h4>
                            </Link>
                        </div>
                        
                    )
                    )
                }
            </div>
            
        </div>
     );
}
 
export default Families;