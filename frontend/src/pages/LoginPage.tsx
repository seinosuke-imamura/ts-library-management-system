import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login, isLoggedIn, isLoading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
            const success = await login(username, password)
            if (success) {
                navigate('/books')
            } else {
                setError('ユーザー名またはパスワードが正しくありません。')
            }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isLoggedIn) {
        return <Navigate to="/books" replace/>
    }
    return (
        <div>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
      </div>
    )
}

export default LoginPage;