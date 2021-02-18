import React, { SyntheticEvent, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import API from "@/utils/api";
import { connect, DefaultRootState, RootStateOrAny } from "react-redux";

import { setUser } from "@/store/actions/user";
import { AxiosResponse } from "../../node_modules/axios/index";
import { Action } from "../../node_modules/redux/index";

type Props = DispatchProps

interface DispatchProps {
	setUser: (data: {accessToken: string}) => void
}

const Login: React.FC<Props> = ({ setUser }: Props) => {
	const [email, setEmail] = useState<string>("test@test.ru");
	const [password, setPassword] = useState<string>("1234");
	const [loader, setLoader] = useState<boolean>(false);
	
	const history = useHistory();

	function login(e: SyntheticEvent) {
		e.preventDefault();
		setLoader(true);
		
		API.post<{accessToken: string}>("auth/login", {
			email,
			password,
		}).then((res: AxiosResponse) => {
			setUser(res.data);
			setLoader(false);
		}).catch((err: Error) => {
			setLoader(false);
			console.log(err);
		});
	}

	return (
		<section className="register">
			<div className="register__wrapper">
				<p>Авторизация</p>
				<form action="" onSubmit={login} className="register__form">
					<label htmlFor="" className="register__label">
						<input type="text" placeholder="Введите почту" value={email} onChange={(e) => {
							setEmail(e.target.value);
						}} className="register__input" />
						<span></span>
					</label>
					<label htmlFor="" className="register__label">
						<input type="password" placeholder="Введите пароль" value={password} onChange={(e) => {
							setPassword(e.target.value);
						}} className="register__input" />
						<span></span>
					</label>

					<button type="submit" disabled={loader} className="register__button register__button_login">
						<span>Войти</span>
						{loader ? <img className="loader loader_small" src={require("@/assets/images/icons/loader.svg")} alt="" /> : null}
					</button>
					<NavLink to="/signup" className="register__link">Регистрация</NavLink>
				</form>
			</div>
		</section>
	);
};

function mapDispatchToProps(dispatch: React.Dispatch<Action>) {
	return {
		setUser(user: {accessToken: string}) {
			dispatch(setUser(user));
		},
	};
}

export default connect<DispatchProps>(null, mapDispatchToProps)(Login);
