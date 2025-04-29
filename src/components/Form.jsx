import api from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant"

export default function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        
        try {
            const res = await api.post (route, {
                username, password
            })

            if (method === 'login') {
                localStorage.setItem (ACCESS_TOKEN, res.data.access)
                localStorage.setItem (REFRESH_TOKEN, res.data.refresh)
                navigate ('/')
            }else {
                navigate ('/login')
            }
        }catch (err) {
            alert (err)
        }finally {
            setLoading (false)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault ()
        if (method == 'register') {
            navigate ('/login')
            method = 'login'
            return
        }
        navigate ('/register')
        method = 'register'
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-blue-600 uppercase">
                    {method === "login" ? "Login" : "Register"}
                </h1>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading
                        ? "Processing..."
                        : method === "login"
                        ? "Login"
                        : "Register"}
                </button>


                
                <button
                    onClick={handleRegister}
                    className="w-full bg-amber-200 text-blue-950 font-semibold py-2 rounded-lg transition duration-300"
                    disabled={loading}
                >
                    {
                        method == 'register'? 'Back to login' : 'Not have an account? Register'
                    }
                </button>
            </form>
        </div>
    )
}
