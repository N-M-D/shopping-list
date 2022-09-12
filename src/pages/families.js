import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom'

const Families = () => {
    const token = localStorage.getItem("token");
    const heroku = `https://chua-shopping.herokuapp.com`;

    const [newFamilyName, setNewFamilyName] = useState("");
    const [families, setFamilies] = useState([]);

    function createFamily(e) {
        e.preventDefault();
        const body = {
            name: newFamilyName
        }
        console.log(body)
        fetch(`${heroku}/family`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            console.log(response)
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="form" onSubmit={createFamily}>
                            <div className="modal-body">
                                <label>Family Name</label>
                                <input type="text" className="form-control" placeholder="Enter Family Name" value={newFamilyName} onChange={e => setNewFamilyName(e.target.value)}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <h1>Family</h1>
            <button className="btn btn-primary" onClick={createFamily}>Create Family</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Launch demo modal</button>
            <h2>My Families</h2>     
            <div className="family-group" style={{border: "1px solid black"}}>
                {
                    families.map((family) => (
                        <div className="familySelect" style={{backgroundColor: "grey", padding: "1em 0", border: "1px solid #222"}} key={family.familyID}>
                            <Link to={`/family/${family.familyID}`} className="familySelect" style={{textDecoration: "none", color: "black"}}>
                                <h4 >{family.name}</h4>
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