import { useState } from 'react'
import { apiClient } from '../lib/api'
import { useNavigate, Link ,Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'



export function BookAddPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const role = user?.role ?? 'USER'
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [category, setCategory] = useState('')
    const [isbn, setIsbn] = useState('')
    const [quantity, setQuantity] = useState('')
    const [publicationYear, setPublicationYear] = useState('')
    const [stock, setStock] = useState('0')
    const [error, setError] = useState<string | null>(null)

    if (user?.role !== 'ADMIN' && user?.role !== 'STAFF') {
        return <Navigate to="/books" replace />
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        if (!title) {
            setError('Title is required')
            return
        }
      
        const body = {
          title,
          author,
          publisher,
          category,
          quantity: Number(quantity),
          isbn,
          publicationYear: Number(publicationYear),
          stock: Number(stock)
        }
      
        const response = await apiClient('/api/books', {
          method: 'POST',
          body: JSON.stringify(body),
        })
      
        if (response.success) {
          navigate(`/books`)
        } else {
          setError(response.error.message)
        }
      }
    return (
        <div>
            <h1>Book Add Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="publicationYear">Publication Year</label>
                    <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
                <button type="submit">追加</button>
                {error && <p>{error}</p>}
                <Link to="/books">一覧に戻る</Link>
                
            </form>
        </div>
    )
}