import React, { SyntheticEvent, useState } from "react";
import API from "@/utils/api";
import { useHistory, NavLink } from "react-router-dom";
import { AxiosResponse } from "../../node_modules/axios/index";

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isRegistered, setIsRegistered] = useState<boolean>(false);

	const history = useHistory();

	function login(e: SyntheticEvent) {
		e.preventDefault();
		API.post<{token: string}>("auth/signup", {
			email,
			password,
		}).then((res: AxiosResponse) => {
			history.replace("/login");
		}).catch((err: Error) => {
			console.log(err);
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

					<button type="submit" disabled={isRegistered} className="register__button register__button_register">Зарегистрироваться</button>
					<NavLink to="/login" className="register__link">Авторизация</NavLink>
				</form>
			</div>
		</section>
	);
};

export default Register;
