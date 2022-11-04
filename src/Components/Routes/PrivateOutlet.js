import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

export default function PrivateOutlet() {
    const { authUser } = useAuth();

    return Object.keys(authUser).length ? <Outlet /> : <Navigate to="/login" />
}