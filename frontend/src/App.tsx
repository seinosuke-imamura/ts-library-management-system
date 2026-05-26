import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { BooksPage } from './pages/BooksPage'
import { BookDetailPage } from './pages/BookDetailPage'
import { BookAddPage } from './pages/BookAddPage'
import RentalsPage from './pages/RentalsPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BookEditPage } from './pages/BookEditPage'



function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/new" element={<BookAddPage />} />
                <Route path="/books/:id/edit" element={<BookEditPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/rentals" element={<RentalsPage />} />
              </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App