import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Header = () => {

    const heroku = `https://chua-shopping.herokuapp.com`;
    const token = localStorage.getItem("token");

    const [isLoggedIn, setIsLoggedIn] = useState();
    const [username, setUsername] = useState("User");

    useEffect(() => {
        getUsername();
        setIsLoggedIn((token != null));
    }, [])

    function logOutHandler() {
        localStorage.clear();
        window.location.href = "/";
    }

    function getUsername(){
        fetch(`${heroku}/user/username`, {
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            setUsername(response.rows[0].username)
        })
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Chua Shopping</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/families">My Families</Link>
                </li>
            </ul>
            {isLoggedIn && 
            <div className='nav-item dropdown'>
                <div role="button" data-toggle="dropdown" aria-expanded="false" className='nav-link dropdown-toggle'>{username}</div>
                <div className="dropdown-menu">
                    <Link to="/user">My Profile</Link>
                    <div className="dropdown-divider"></div>
                    <button className='btn btn-danger' id="logOutBtn" onClick={logOutHandler}>Log Out</button>
                </div>
            </div>
            }
            {!isLoggedIn && <Link to="/login" style={{backgroundColor: 'blue', padding: '0.5em 1em', color:'white', borderRadius: '1em'}}>Login</Link>}
        </div>
        </nav>
     );
}
 
export default Header;