import React from "react";
import { Switch } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }: Props) => (
	<div>
		Авторизация
		{children}
	</div>
);

export default AuthLayout;
