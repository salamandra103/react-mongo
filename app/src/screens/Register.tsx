import React, { SyntheticEvent, useState } from "react";
import API from "@/utils/api";
import { useHistory, NavLink } from "react-router-dom";
import { AxiosResponse } from "../../node_modules/axios/index";

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loader, setLoader] = useState<boolean>(false);

	const history = useHistory();

	function register(e: SyntheticEvent) {
		e.preventDefault();
		setLoader(true);

		API.post<{accessToken: string}>("auth/signup", {
			email,
			password,
		}).then((res: AxiosResponse) => {
			history.replace("/login");
		}).catch((err: Error) => {
			setLoader(false);
			console.log(err);
		});
	}

	return (
		<section className="register">
			<div className="register__wrapper">
				<p>Регистрация</p>
				<form action="" onSubmit={register} className="register__form">
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
						{loader ? <img className="loader loader_small" src={require("@/assets/images/icons/loader.svg")} alt="" /> : null}
					</button>
					<NavLink to="/login" className="register__link">Авторизация</NavLink>
				</form>
			</div>
		</section>
	);
};

export default Register;
