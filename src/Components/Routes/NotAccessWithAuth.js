import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

export default function NotAccessWithAuth() {
    const { authUser } = useAuth();

    return (!authUser || !Object.keys(authUser).length) ? <Outlet /> : <Navigate to="/" />
}