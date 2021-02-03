import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

const PrivateComponent = ({ component: Component = null, isAuth, redirectPath, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={(props: any) =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: redirectPath,
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateComponent
