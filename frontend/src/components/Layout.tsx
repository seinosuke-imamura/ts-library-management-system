import { Outlet , Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


export default function Layout() {
    const { user, isLoggedIn, logout } = useAuth()
    const role = user?.role
    const navigate = useNavigate()

    return (
        <div>
            <h1>現在のログインユーザー：{user?.role}</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
                {(role === 'ADMIN' || role === 'STAFF') && (
                    <Link to="/rentals">Rentals</Link>
                )}
                {isLoggedIn && (
                    <button type="button" onClick={() => {
                        logout()
                        navigate('/login')
                    }}>Logout</button>
                )}
                {!isLoggedIn && (
                    <Link to="/login">Login</Link>
                )}
                <Link to="/rentals/my">自分の貸出</Link>
            </nav>
            <Outlet />
        </div>
    )
}