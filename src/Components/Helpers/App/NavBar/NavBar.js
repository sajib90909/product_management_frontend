import react from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../../../Assets/Images/logo.png";
import { useAuth } from "../../../../Contexts/AuthContext";
import AppButton from "../../Commons/Buttons/AppButton";

function NavBar() {
    const { authUser, logout } = useAuth()
    const navigate = useNavigate();

    function logoutSubmit() {
        logout(afterSuccessLogout);
    }
    function afterSuccessLogout() {
        navigate('/')
    }

    return (
        <nav className="navbar navbar-light bg-light px-4">
            <a className="navbar-brand" href={'/'}>
                <img src={appLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </a>
            { authUser && Object.keys(authUser).length 
            ? (
                <div>
                    <Link className="app-text-decoration-none mx-4" to="/products/add">
                        <AppButton className="btn-primary btn-sm mx-2 rounded" value="Add Product"/>
                    </Link>
                    
                    <AppButton className="btn-light btn-sm mx-2" value={authUser.name}/>

                    <Link className="app-text-decoration-none" to="/login">
                        <AppButton className="btn-primary btn-sm mx-2" onClick={logoutSubmit} value="Logout"/>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link className="app-text-decoration-none" to="/login">
                        <AppButton className="btn-primary btn-sm mx-2" value="Login"/>
                    </Link>
                    <Link className="app-text-decoration-none" to="/signup">
                        <AppButton className="btn-primary btn-sm mx-2" value="Signup"/>
                    </Link>
                </div>
            )}
            
        </nav>
    )
}

export default react.memo(NavBar)