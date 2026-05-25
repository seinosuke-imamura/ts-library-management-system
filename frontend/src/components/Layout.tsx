import { Outlet , Link } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
                <Link to="/rentals">Rentals</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Outlet />
        </div>
    )
}