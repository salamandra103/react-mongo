import React, { SyntheticEvent, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import API from "@/utils/api";
import { connect, DefaultRootState, RootStateOrAny } from "react-redux";

import { setUser } from "@/store/actions/user";
import { AxiosResponse } from "../../node_modules/axios/index";
import { Action } from "../../node_modules/redux/index";

type Props = StateProps & DispatchProps

interface StateProps {
    user: {
		token: string
	}
}

interface DispatchProps {
	setUser: (data: {token: string}) => void
}

const Login: React.FC<Props> = ({ user, setUser }: Props) => {
	const history = useHistory();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loader, setLoader] = useState<boolean>(false);

	function login(e: SyntheticEvent) {
		e.preventDefault();
		setLoader(true);
		API.post<{token: string}>("auth/login", {
			email,
			password,
		}).then((res: AxiosResponse) => {
			setUser(res.data);
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
						{loader ? <img className="loader loader_small" src={require("@/assets/images/icons/loader.svg")} alt="" /> : null}
					</button>
					<NavLink to="/signup" className="register__link">Регистрация</NavLink>
				</form>
			</div>
		</section>
	);
};

function mapStateToProps(state: StateProps) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch: React.Dispatch<Action>) {
	return {
		setUser(user: {token: string}) {
			dispatch(setUser(user));
		},
	};
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Login);
