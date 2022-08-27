import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn((token != null));

    }, [])

    function logOutHandler() {
        localStorage.clear();
        window.location.href = "/";
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
                <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                </li>
            </ul>
            {isLoggedIn && 
            <div className='nav-item dropdown'>
                <div role="button" data-toggle="dropdown" aria-expanded="false" className='nav-link dropdown-toggle'>User</div>
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