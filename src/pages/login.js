import { useState } from "react";
import { Link } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const heroku = `https://chua-shopping.herokuapp.com`;

    function login(e){
        e.preventDefault();
        const body = {
            email: email,
            password: password
        }
        fetch(`${heroku}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            throw 'Your email or password is incorrect'
        })
        .then((user) => {
            const token = user.token;

            localStorage.setItem("token", token);
            alert("Logged In");
        })
        .catch((error) => {
            alert(error);
        })
    }
    return ( 
        <div className="container">
            <form className="loginForm" onSubmit={login}>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input id="email" className="form-control" type="email" value={email} onChange={event => setEmail(event.target.value)}></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input id="password" className="form-control" type="password" value={password} onChange={event => setPassword(event.target.value)}></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Sign up</Link>
        </div>
     );
}
 
export default Login;