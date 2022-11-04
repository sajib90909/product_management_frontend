import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Home/Home";
import NotFoundPage from "../Pages/NotFound/NotFoundPage";
import AddProduct from "../Pages/Product/AddProduct";
import Products from "../Pages/Product/Product";
import NotAccessWithAuth from "./NotAccessWithAuth";
import PrivateOutlet from "./PrivateOutlet";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={ <NotFoundPage />}/>

                <Route path="/" element={ <Home />}/>
                <Route path="products/:slug" element={ <Products /> } />

                <Route path="/*" element={<PrivateOutlet />}>
                    <Route path="products/add" element={ <AddProduct /> } />
                    <Route path="products/edit/:slug" element={ <AddProduct /> } />
                </Route>

                <Route path="/*" element={<NotAccessWithAuth />}>
                    <Route path="login" element={ <Login />}/> 
                    <Route path="signup" element={ <Signup />}/>
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRoutes;