import React, { SyntheticEvent, useState } from 'react'
import API from "@/utils/api";
import { useHistory, NavLink } from 'react-router-dom'

import { AxiosResponse } from '../../node_modules/axios/index';
import { connect } from 'react-redux';
interface Props {
    user: Object
}

const Register: React.FC<Props> = ({ user }) => {

    const history = useHistory();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)

    function signup(e: SyntheticEvent) {
        e.preventDefault();
        setLoader(true)
        // API.post('auth/signup', {
        //     email: email,
        //     password: password,
        // }).then((res: AxiosResponse<{ token: string }>) => {
        //     setLoader(false)
        //     history.replace('/login')
        // }).catch((err: Error) => {
        //     console.log(err);
        //     setLoader(false)
        // })
        setTimeout(() => {
            setLoader(false)

        }, 3000)
    }

    return (
        <section className="register">
            <div className="register__wrapper">
                <p>Регистрация</p>
                <form action="" onSubmit={signup} className="register__form">
                    <label htmlFor="" className="register__label">
                        <input type="text" placeholder="Введите почту" onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="register__input" />
                        <span></span>
                    </label>
                    <label htmlFor="" className="register__label">
                        <input type="password" placeholder="Введите пароль" onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="register__input" />
                        <span></span>
                    </label>

                    <button type="submit" disabled={loader} className="register__button register__button_register">
                        <span>Зарегистрироваться</span>
                        {loader ? <img className="loader loader_small" src={require('@/assets/images/icons/loader.svg')} alt="" /> : null}
                    </button>
                    <NavLink to="/login" className="register__link">Авторизация</NavLink>
                </form>
            </div>
        </section>
    )
}

interface State {
    user: Object
}

export default connect((state: State) => {
    return {
        user: state.user
    }
}, null)(Register)
