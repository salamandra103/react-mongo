import React, { MouseEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";

import { removeUser } from "@/store/actions/user";
import store from "@/store/";
import { Action } from "../../node_modules/redux/index";

type Props = StateProps & DispatchProps

interface StateProps {
    user: {
        accessToken: string
    }
}

interface DispatchProps {
    removeUser: () => void
}

const Header: React.FC<Props> = ({ removeUser, user }: Props) => (
	<header className="header">
		<div className="header__wrapper">
			{user ? <button type="button" onClick={(e: SyntheticEvent) => removeUser()} className="header__signout">Выйти</button> : null}
		</div>
	</header>
);

function mapStateToProps(state: StateProps) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch: React.Dispatch<Action>) {
	return {
		removeUser() {
			dispatch(removeUser());
		},
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
