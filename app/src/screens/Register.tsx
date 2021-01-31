import React, { SyntheticEvent, useState } from 'react'
import API from "@/utils/api";


const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    function login(e: SyntheticEvent) {
        e.preventDefault();
        API.post('auth/signup', {
            email: email,
            password: password,
        });
    }

    return (
        <section className="register">
            <div className="register__wrapper">
                <p>Регистрация</p>
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

                    <button type="submit" disabled={isRegistered} className="register__button register__button_submit">Зарегистрироваться</button>
                </form>
            </div>
        </section>
    )
}

export default Register
