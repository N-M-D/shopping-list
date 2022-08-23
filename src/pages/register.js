import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const heroku = `https://chua-shopping.herokuapp.com`;

    function register(e){
        e.preventDefault();
        const body = {
            email: email,
            username: username,
            password: password
        }
        fetch(`${heroku}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
        .then((response) => {
            if(response.status === 201){
                return alert("Register Success")
            }
            throw 'Your email or password is incorrect'
        })
        .catch((error) => {
            alert(error);
        })
    }
    return ( 
        <div className="main">
            <form className="registerForm" onSubmit={register}>
                <div className="form-group">
                   <label for="email">Email</label>
                    <input id="email" type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)}></input> 
                </div>
                <div className="form-group">
                   <label for="email">Username</label>
                    <input id="email" type="text" className="form-control" value={username} onChange={event => setUsername(event.target.value)}></input> 
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password"className="form-control" value={password} onChange={event => setPassword(event.target.value)}></input>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
     );
}
 
export default Register;