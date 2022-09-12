import { useEffect } from "react";
import { useState } from "react";

const Family = () => {
    const path = window.location.pathname.split('/');

    const familyID = path[path.length - 1]
    const [familyName, setFamilyName] = useState("");
    const [familyMembers, setFamilyMembers] = useState([]);

    const heroku = `https://chua-shopping.herokuapp.com`;

    const token = localStorage.getItem('token');
    function getFamilyDetails(){
        fetch(`${heroku}/family/${familyID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setFamilyName(response.rows[0].name);
        })
        .catch((error) => {
            alert(error);
        })
    }

    function getFamilyMembers(){
        fetch(`${heroku}/family/${familyID}/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setFamilyMembers(response.rows);
        })
    }

    useEffect(() => {
        getFamilyDetails();
        getFamilyMembers();
    }, [])

    return ( 
        <div className="container">
            <h1>Families</h1>
            <div className="family-details">
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                Family Name
                            </td>
                            <td>
                                {familyName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Family Size
                            </td>
                            <td>
                                {familyMembers.length}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
     );
}
 
export default Family;