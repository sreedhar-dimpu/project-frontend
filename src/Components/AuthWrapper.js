import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
// import AccountantApp from '../AccountantApp';
import Login from './Login';
import Register from './Register';

const AuthWrapper = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})

    // Synchronize authentication state with localStorage
    useEffect(() => {
        setLoading(true)
        const userString = localStorage.getItem('user')
        if(userString){
            try{
                setUser(JSON.parse(userString))
            }catch{
                setUser({})
            }
        }else{
            setUser({})
        }
        setLoading(false)
    }, []); // Run only on mount

    const handleLoginSuccess = (response) => {
        localStorage.setItem('user', JSON.stringify(response)); 
        setUser(response)
    };

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser({}); // Reset state
    };

    if(loading){
        return <div>Loading</div>
    }
    if(user?.role){
        return(
        <Routes>{
            <Route path="/*" element={<App onLogout={handleLogout} user={user} />} />
            }
        </Routes>
        )
    }
    return (
        <Routes>
            {(
                <>
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            )}
        </Routes>
    );
};

export default AuthWrapper;
