import { useEffect } from 'react'
import { apiClient } from '../lib/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Rental } from '../types'

export function MyRentalsPage() {
    const { user } = useAuth()
    const [rentals, setRentals] = useState<Rental[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        void (async() => {
            setLoading(true)
            setError(null)
            const response = await apiClient('/api/rentals/my', { method: 'GET' })
            if (response.success) {
                setRentals(response.data)
            } else {
                setError(response.error.message)
            }
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>自分の貸出</h1>
            {rentals.length === 0 ? (
                <div>貸出中の図書はありません</div>
            ) : (
                <ul>
                    {rentals.map((rental) => (
                        <li key={rental.id}>
                            <p>貸出日: {new Date(rental.rentedDate).toLocaleDateString('ja-JP')}</p>
                            <p>返却期限: {new Date(rental.dueDate).toLocaleDateString('ja-JP')}</p>
                            <p>
                                {rental.returnDate === null ? '貸出中' : `返却済み`}
                            </p>
                                <Link to={`/books/${rental.bookId}`} key={rental.id}>書籍を見る</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }