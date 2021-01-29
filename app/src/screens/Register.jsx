import React from 'react'

const Register = () => {
    return (
        <section className="register">
            <div className="register__wrapper">
                <p>Регистрация</p>
                <form action="" className="register__form">
                    <label htmlFor="" className="register__label">
                        <input type="text" onChange={(e) => {
                            console.log(e.target.value);
                        }} className="register__input"/>
                    </label>
                </form>
            </div>
        </section>
    )
}

export default Register
