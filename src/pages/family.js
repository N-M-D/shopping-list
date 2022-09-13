import { useEffect } from "react";
import { useState } from "react";

const Family = () => {
    const host = window.location.host
    const path = window.location.pathname.split('/');

    const familyID = path[path.length - 1]
    const [familyName, setFamilyName] = useState("");
    const [familyMembers, setFamilyMembers] = useState([]);
    const [inviteLink, setInviteLink] = useState("");

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

    function generateLink(){
        fetch(`${heroku}/family/${familyID}/link`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const key = response.rows[0].key
            let s = host + "/invite/" + key
            setInviteLink(s);
        })
    }

    useEffect(() => {
        getFamilyDetails();
        getFamilyMembers();
    }, [])

    return ( 
        <div className="container">
            <h1>Family</h1>
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
            </div>{/* END FAMILY DETAILS*/}
            <div className="members">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={generateLink}>
                    Invite Others
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Invite Members</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="form">
                            <div className="modal-body">
                                <label>Invite Link</label>
                                <input type="text" className="form-control" value={inviteLink} readOnly></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default Family;