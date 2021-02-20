import React, { Dispatch, SyntheticEvent, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import API from "@/utils/api";
import { connect, DefaultRootState, RootStateOrAny } from "react-redux";

import { setUserAsync } from "@/store/actions/user";
import { AxiosResponse } from "../../node_modules/axios/index";
import { Action } from "../../node_modules/redux/index";
import { ThunkAction } from "../../node_modules/redux-thunk/index";

type Props = DispatchProps

interface DispatchProps {
	setUserAsync: (email: string, password: string) => void
}

const Login: React.FC<Props> = ({ setUserAsync }: Props) => {
	const [email, setEmail] = useState<string>("test@test.ru");
	const [password, setPassword] = useState<string>("1234");
	const [loader, setLoader] = useState<boolean>(false);
	
	const history = useHistory();

	async function login(e: SyntheticEvent) {
		e.preventDefault();
		setLoader(true);
		await setUserAsync(email, password);
		setLoader(false);
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

const mapDispatchToProps = (dispatch: React.Dispatch<Action | Function | Promise<any>>) => ({
	setUserAsync: async(email: string, password: string) => {
		await dispatch(setUserAsync({ email, password }));
	},
});

export default connect<DispatchProps>(null, mapDispatchToProps)(Login);
