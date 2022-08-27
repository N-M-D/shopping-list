import { useEffect, useState } from "react";
import axios from 'axios'

const Profile = () => {

    const [pfp, setPfp] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const heroku = `https://chua-shopping.herokuapp.com`;
    // const heroku = `http://localhost:8080`
    const token = localStorage.getItem('token');

    async function updateDetails(e){
        e.preventDefault();
        // const body = {
        //     pfp: pfp,
        //     email: email,
        //     username: username
        // }
        const formData = new FormData();
        formData.append("pfp", pfp);
        formData.append("email", email);
        formData.append("username", username);
        // fetch(`${heroku}/user/update`, {
        //     method: "PUT",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     },
        //     body: formData
        // })
        // .then((response) => {
        //     console.log(response)
        // })
        const result = await axios.put(`${heroku}/user/update`, formData, { headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}})
        console.log(result)
    }

    useEffect(() => {
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
                <form onSubmit={updateDetails}>
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
                    <button className="btn btn-primary" type="submit">Edit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Profile;