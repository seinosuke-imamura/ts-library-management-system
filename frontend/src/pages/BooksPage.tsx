import { useEffect, useCallback } from 'react'
import { apiClient } from '../lib/api'
import { useState } from 'react'
import type { Book } from '../types'
import { BookCard } from '../components/BookCard'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function BooksPage() {
    const { user } = useAuth()
    const role = user?.role ?? 'USER'
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchBooks = useCallback(async (query: string) => {
        const url = 
          query.trim() === ''
            ? '/api/books'
            : `/api/books/search?q=${encodeURIComponent(query.trim())}`
      const response = await apiClient(url, { method: 'GET' })
        if (response.success) {
            setBooks(response.data)
        } else {
            setError(response.error.message)
        } 
    }, [])   
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        void fetchBooks(searchQuery)
    }
    useEffect(() => {
      void fetchBooks('').finally(() => setLoading(false))
    }, [fetchBooks])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    if (books.length === 0) {
        return <div>No books found</div>
    }
    return (
        <div>
            <h1>書籍一覧ページ</h1>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 w-64 h-10" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-24 h-10">検索</button>
            </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <Link to = {`/books/${book.id}`} key={book.id}> <BookCard title={book.title} author={book.author} stock={book.stock} /> </Link>
                    ))}
                    {(role === 'ADMIN' || role === 'STAFF') && (
                        <Link to="/books/new">新しい図書を追加</Link>
                    )}
                </div>
        </div>
    )
}