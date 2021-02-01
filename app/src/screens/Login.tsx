import React, { SyntheticEvent, useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import API from "@/utils/api";
import { AxiosResponse } from '../../node_modules/axios/index';
import { connect } from 'react-redux';

import { setUser } from '@/store/actions/user'

interface Props {
    user: Object,
    setUser: Function
}

const Login: React.FC<Props> = ({ user, setUser }) => {

    const history = useHistory();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)


    function login(e: SyntheticEvent) {
        e.preventDefault();
        setLoader(true);
        // API.post('auth/login', {
        //     email: email,
        //     password: password,
        // }).then((res: AxiosResponse<{ token: string }>) => {
        //     localStorage.setItem('token', res.data.token);
        //     setUser({
        //         email: email,
        //         token: res.data.token
        //     });
        //     setLoader(false)
        //     history.replace('/')

        // }).catch((err: Error) => {
        //     setLoader(false)
        //     console.log(err);
        // })
        setTimeout(() => {
            setLoader(false)

        }, 3000)
    }

    return (
        <section className="register">
            <div className="register__wrapper">
                <p>Авторизация</p>
                <form action="" onSubmit={login} className="register__form">
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

                    <button type="submit" disabled={loader} className="register__button register__button_login">
                        <span>Войти</span>
                        {loader ? <img className="loader loader_small" src={require('@/assets/images/icons/loader.svg')} alt="" /> : null}
                    </button>
                    <NavLink to="/signup" className="register__link">Регистрация</NavLink>
                </form>
            </div>
        </section>
    )
}

interface StateProps {
    user: Object
}

interface DispatchProps {
    setUser: Function
}

function mapStateToProps(state: StateProps) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        setUser(user: Object) {
            dispatch(setUser(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
