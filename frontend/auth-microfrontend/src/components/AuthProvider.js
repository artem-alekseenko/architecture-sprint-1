import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from './AuthContext';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState('');
    const history = useHistory();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken) {
            setToken(storedToken);
            auth
                .checkToken(storedToken)
                .then((res) => {
                    setUser(res.data);
                    setIsLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem('jwt');
                });
        }
    }, []);

    const onLogin = ({ email, password }) => {
        return auth
            .login(email, password)
            .then((res) => {
                setIsLoggedIn(true);
                setUser(res.user);
                setToken(res.token);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus('error');
                setIsInfoTooltipOpen(true);
            });
    };

    const onRegister = ({ email, password }) => {
        return auth
            .register(email, password)
            .then((res) => {
                setTooltipStatus('success');
                setIsInfoTooltipOpen(true);
                setTimeout(() => {
                    setIsInfoTooltipOpen(false);
                    history.push('/signin');
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setTooltipStatus('error');
                setIsInfoTooltipOpen(true);
            });
    };

    const onLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        history.push('/signin');
    };

    const closeInfoTooltip = () => {
        setIsInfoTooltipOpen(false);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, user, token, onLogin, onRegister, onLogout }}
        >
            {children}
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeInfoTooltip}
                status={tooltipStatus}
            />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
