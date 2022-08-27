import { useState } from "react";
import ChangePassword from "./changePassword";
import Profile from "./profile";

const User = () => {
    const [page, setPage] = useState("profile");

    return ( 
        <div className="container">
            <h1>User</h1>
            <div className="main row">
                <div className="side bg-light col-md-3 col-sm-12">
                    <ul>
                        <li onClick={() => setPage("profile")}>Profile</li>
                        <li onClick={() => setPage("changepassword")}>Change Password</li>
                    </ul>
                </div>
                <div className="content bg-light col-md-9 col-sm-12">
                    {page==="profile" && <Profile></Profile>}
                    {page==="changepassword" && <ChangePassword></ChangePassword>}
                </div>
            </div>
            
        </div>
     );
}
 
export default User;