import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            component={(props) => {
                return (isAuthenticated)
                ? <Component {...props} />
                : <Redirect to='/auth/login' />
            }}
        />
    )
}

export default PrivateRoute
