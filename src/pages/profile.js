import { useEffect, useState } from "react";
import axios from 'axios'

const Profile = () => {

    const [pfp, setPfp] = useState();
    const [profile, setProfile] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const heroku = `https://chua-shopping.herokuapp.com`;
    // const heroku = `http://localhost:8080`
    const token = localStorage.getItem('token');
    const modal = document.getElementById('modal');

    function showModal(){
        modal.style.display = "block";
    }

    function hideModal(){
        modal.style.display = "none";
    }

    async function updateDetails(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("pfp", pfp);
        formData.append("email", email);
        formData.append("username", username);
        const result = await axios.put(`${heroku}/user/update`, formData, 
            { headers: {'Content-Type': 'multipart/form-data', 
                'Authorization': 'Bearer ' + token}}
        )
        console.log(result)
    }

    useEffect(() => {
        if(token == null){
            window.location.href = "/"
        }
        fetch(`${heroku}/user/details`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            let user = response.rows[0];
            setUsername(user.username);
            setEmail(user.email);
            setPfp(user.pfp);
        })
    }, [])

    return ( 
        <div className="container">
            
            <h1 className="heading">Profile</h1>
            <div className="main">
            <div id="modal" style={{backgroundColor: "#222", display: "none", zIndex: "1", position: "fixed", width: "50vw", margin: "auto"}}>
                <span class="close" onClick={hideModal}>&times;</span>
                <p>Some text in the Modal..</p>
            </div>
                <form onSubmit={updateDetails}>
                    <div className="row">
                        <div className="col col-md-6 col-6">
                            <div className="pfp" style={{backgroundColor: "#222", borderRadius:"100vmax", width: "100%", height: 0, paddingBottom: "100%", backgroundImage: "url('https://chuashopping.s3.ap-southeast-1.amazonaws.com/ada556a4f28e7f21f00ea1779f56bd5b')", backgroundPosition: "center"}} onClick={showModal}></div>
                        </div>
                        <div className="col col-md-6 col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input id="email" type="email" className="form-control" value={email}></input>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input id="email" type="text" value={username} onChange={event => setUsername(event.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Profile Picture</label>
                                <input id="email" type="file" className="form-control" accept="image/*" onChange={event => setPfp(event.target.files[0])}></input>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Edit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Profile;