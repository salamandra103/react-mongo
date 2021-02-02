import React, { MouseEvent, SyntheticEvent } from 'react'
import { connect } from 'react-redux';

import { removeUser } from '@/store/actions/user'
import store from '@/store/'
interface Props {
    user: Object,
    removeUser: Function
}

const Header: React.FC<Props> = ({ removeUser, user }) => {

    return (
        <header className="header">
            <div className="header__wrapper">
                {user ? <button type="button" onClick={(e: SyntheticEvent) => removeUser()} className="header__signout">Выйти</button> : null}
            </div>
        </header>
    )
}

interface StateProps {
    user: Object
}

function mapStateToProps(state: StateProps) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        removeUser() {
            dispatch(removeUser());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
