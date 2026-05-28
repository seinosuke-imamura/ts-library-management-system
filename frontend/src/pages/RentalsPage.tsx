import { useEffect, useCallback } from 'react'
import { apiClient } from '../lib/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { RentalWithDetails } from '../types'
import { Navigate } from 'react-router-dom'

export function RentalsPage() {
    const { user } = useAuth()
    const [rentalDetails, setRentalDetails] = useState<RentalWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRentals = useCallback(async () => {
      const response = await apiClient('/api/rentals', { method: 'GET' })
      if (response.success) {
          setRentalDetails(response.data)
      } else {
          setError(response.error.message)
      }
  }, [])
  
  const handleReturn = async (rentalId: string) => {
    const response = await apiClient(`/api/rentals/${rentalId}/return`, { method: 'PUT' })
    if (response.success) {
        void fetchRentals()
      } else {
          setError(response.error.message)
      }
  }
    
    useEffect(() => {
        void (async() => {
            try {
                setLoading(true)
            setError(null)
                await fetchRentals()
                setLoading(false)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        })()
    }, [fetchRentals])  // 依存配列に fetchRentals を追加することで、fetchRentals が変更されたときに再実行される

    if (user?.role !== 'ADMIN' && user?.role !== 'STAFF') {
      return <Navigate to="/books" replace />
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>貸出履歴</h1>
            {rentalDetails.length === 0 ? (
                <div>貸出中の図書はありません</div>
            ) : (
                <ul>
                    {rentalDetails.map((rental) => (
                        <li key={rental.id}>
                            <p>貸出日: {new Date(rental.rentedDate).toLocaleDateString('ja-JP')}</p>
                            <p>返却期限: {new Date(rental.dueDate).toLocaleDateString('ja-JP')}</p>
                            <p>
                                {rental.returnDate === null ? '貸出中' : `返却済み`}
                                {rental.returnDate === null && (
                                    <button type="button" onClick={() => handleReturn(rental.id)}>返却</button>
                                )}
                            </p>
                            <Link to={`/books/${rental.bookId}`} >書籍を見る</Link>
                            </li>
                    ))}
                </ul>
            )}
        </div>
    )
}