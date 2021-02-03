import React from 'react'
import { Switch } from 'react-router-dom'

interface Props {
}

const AuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            Авторизация
            {children}
        </div>
    )
}

export default AuthLayout
