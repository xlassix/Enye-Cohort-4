import React from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {SIGN_IN} from "../routes/all"
interface LooseObject {
    [key: string]: any
  }
 
const withAuthentication = (Component:any) => {
  class WithAuthentication extends React.Component<LooseObject,any> {

    render() {
        if (this.props.user.logged_in===true){
            return  <Component {...this.props} />;
        }
        return <Redirect to={SIGN_IN}/>
    }
  }
 
  return  connect((state:LooseObject)=>{return({user:state.user})})(WithAuthentication);
};
 
export default withAuthentication;