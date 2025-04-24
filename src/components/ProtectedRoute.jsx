// import {Navigate, UNSAFE_FrameworkContext} from 'react-router-dom'
// import {jwtDecode} from 'jwt-decode'


// import api from '../api'
// import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constant'
// import { useEffect, useState } from 'react'


// export default function ProtectedRoute ({children}) {
//     const [isAuthorized, setIsAuthorized] = useState (null)

//     useEffect (()=> {
//         auth ().catch (() => setIsAuthorized (false))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
//     const refreshToken = async () => {
//         const refeshToken = localStorage.getItem (REFRESH_TOKEN)
//         try {
//             const res = await api.post ('/api/token/refresh/', {
//                 refresh: refeshToken
//             })
//             if (res.status == 200) {
//                 localStorage.setItem (ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized (true)
//             }
//         }catch (err) {
//             console.log (err)
//             setIsAuthorized (false)
//         }
//     }

//     const auth = async () => {
//         const token = localStorage.getItem (ACCESS_TOKEN)
//         if (token) {
//             setIsAuthorized (false)
//             return
//         }
//         const decode = jwtDecode (token)
//         const tokenExpiration = decode.exp
//         const now = Date.now () / 1000

//         if (tokenExpiration < now) await refreshToken ()
//         setIsAuthorized (true)
//     }

//     if (isAuthorized === null) {
//         return <div>loading....</div>
//     }

//     return isAuthorized ? children: <Navigate to='/login' />
// }

import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constant'

export default function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refresh,
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (err) {
            console.log(err)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        try {
            const decode = jwtDecode(token)
            const tokenExpiration = decode.exp
            const now = Date.now() / 1000

            if (tokenExpiration < now) {
                await refreshToken()
            } else {
                setIsAuthorized(true)
            }
        } catch (err) {
            console.error('Invalid token:', err)
            setIsAuthorized(false)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}
