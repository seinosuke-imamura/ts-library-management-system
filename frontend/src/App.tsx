import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import BookDetailPage from './pages/BookDetailPage'
import RentalsPage from './pages/RentalsPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App