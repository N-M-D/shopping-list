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
        console.log(result);
        alert("Done");
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
            console.log("User: ", user);
            setUsername(user.username);
            setEmail(user.email);
            setPfp(user.pfp);
            const pfpDiv = document.getElementById("pfp");
            pfpDiv.style.backgroundImage = `url('${pfp}')`;
            console.log(pfp)
        })
    }, [pfp])

    return ( 
        <div className="container" style={{border: "1px solid green"}}>
            <div id="modal" style={{backgroundColor: "#222", display: "none", zIndex: "1", position: "fixed", color: "white", padding: "1em", width: "calc(100%-15px)"}}>
                <span className="close" onClick={hideModal}>&times;</span>
                <h4 className="header-4">Edit Profile Picture</h4>
                <form>
                    <div className="form-group">
                        <label>Profile Picture</label>
                        <input id="email" type="file" className="form-control" accept="image/*" onChange={event => setPfp(event.target.files[0])}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>
            <h1 className="heading">Profile</h1>
            <div className="main">
                <form onSubmit={updateDetails}>
                    <div className="row">
                        <div className="col col-md-6 col-6">
                            <div className="pfp" id="pfp" style={{backgroundColor: "#222", borderRadius:"100vmax", width: "100%", height: 0, paddingBottom: "100%", backgroundImage: "url('https://chuashopping.s3.ap-southeast-1.amazonaws.com/ada556a4f28e7f21f00ea1779f56bd5b')", backgroundPosition: "center"}} onClick={showModal}></div>
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