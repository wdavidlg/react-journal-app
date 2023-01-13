import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadNotes } from '../actions/notes';

import JournalScreen from '../components/journal/JournalScreen'
import AuthRouter from './AuthRouter'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
    const [checking, setChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const dispatch = useDispatch();
  
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user){
                dispatch( login(user.uid, user.displayName))
                setIsAuthenticated(true);
                dispatch(startLoadNotes());
            }else{
                setIsAuthenticated(false);
            }
            setChecking(false);
        })
    }, [dispatch])

    if(checking){
        return (
            <div style={{
                width: '100vw', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <h3>Cargando...</h3>
            </div>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={isAuthenticated} path='/auth' component={AuthRouter} />
                    <PrivateRoute isAuthenticated={isAuthenticated} exact path='/' component={JournalScreen} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
