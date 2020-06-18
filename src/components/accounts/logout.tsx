import React from "react"
import { Redirect } from "react-router-dom"
import { SIGN_IN } from "../../routes/all"
import { auth } from "../../firebase/config"
import { resetUser } from "../../store/user/actions"
import { clearResult } from "../../store/data/actions"
import { useDispatch } from "react-redux"

export  const LogOut = () => {
    //initialise dispatcher
    const dispatch = useDispatch ();
    auth.signOut().then(() => dispatch(resetUser())).then(() => dispatch(clearResult()))
    return (
        <Redirect to={SIGN_IN} />
    )
}