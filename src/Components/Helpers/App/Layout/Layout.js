import React, { useEffect } from "react";
import { checkUserLogin } from "../../../../Helpers/App/Auth/auth";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

function Layout({ children }) {
    useEffect(() => {
        checkUserLogin()
    }, [])

    return (
        <div className="container-fluid">
            <div className="container main-content app-bg-primary p-0 min-vh-100 overflow-hidden">
                <NavBar />

                { children }

                <Footer/>
            </div>
        </div>
    );
}

export default React.memo(Layout)