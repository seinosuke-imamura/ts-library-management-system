import { useAuth} from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
    const { isLoggedIn, isLoading} = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    } 
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}