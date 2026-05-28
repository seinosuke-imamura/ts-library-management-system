import { useParams } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
import { apiClient } from '../lib/api'
import type { Book } from '../types'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


export function BookDetailPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const role = user?.role ?? 'USER'
    const { id } = useParams()
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [borrowError, setBorrowError] = useState<string | null>(null)
    
    const fetchBook = useCallback(async (id: string) => {
        const response = await apiClient(`/api/books/${id}`, { method: 'GET' })
        if (response.success) {
            setBook(response.data)
        } else {
            setError(response.error.message)
        }
    }, [])

    const handleBorrow = useCallback(async () => {
      if (!book) return
      setBorrowError(null)

      const response = await apiClient('/api/rentals', {
        method: 'POST',
        body: JSON.stringify({ bookId: book.id }),
      })

      if (response.success) {
        navigate('/rentals/my')
      } else {
        setBorrowError(response.error.message)
      }
    }, [book, navigate])

    const handleDelete = useCallback(async () => {
      const confirmed = confirm('本当に削除しますか？')
      if (confirmed) {
        const response = await apiClient(`/api/books/${id}`, { method: 'DELETE' })
        if (response.success) {
          navigate('/books')
        } else {
          setError(response.error.message)
        }
      }
    }, [id, navigate])
    
    useEffect(() => {
        if (!id) {
            setError('Book ID is required')
            setLoading(false)
            return
        }
        void (async() => {
          setLoading(true)
          setError(null)
          const response = await apiClient(`/api/books/${id}`, { method: 'GET' })
          if (response.success) {
            setBook(response.data)
          } else {
            setError(response.error.message)
          }
          setLoading(false)
        })()
    }, [id])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    if (!book) {
        return <div>Book not found</div>
    }
    return (
      <div>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.publisher}</p>
        <p>{book.category}</p>
        <p>{book.quantity}</p>
        <p>{book.isbn}</p>
        <p>{book.publicationYear}</p>
        <Link to="/books">一覧に戻る</Link>
        {book.stock > 0 && (
          <button type="button" onClick={handleBorrow} disabled={book.stock <= 0} className="bg-blue-500 text-white px-4 py-2 rounded-md w-24 h-10">
        借りる
  </button>
)}
{borrowError && <p>{borrowError}</p>}
        {role === 'ADMIN' && (<button type="button" onClick={handleDelete}>削除</button>)}
        {(role === 'ADMIN' || role === 'STAFF') && (<Link to={`/books/${book.id}/edit`}>編集</Link>)}
      </div>
    )
}