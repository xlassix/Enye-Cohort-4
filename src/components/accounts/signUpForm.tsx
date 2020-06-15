import React,{useState} from "react"
import { Form, Input, Button, Spin,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {auth,db} from "../../firebase/config"
import { Link } from 'react-router-dom';
import  {SIGN_IN} from '../../routes/all';
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux"
import { updateUserState} from "../../store/user/actions"

interface LooseObject {
  [key: string]: any
}

 const errorAlert = (info:string) => {
   message.error(info, 3.5);
  };



const SignUpForm = () => {
  const [loading,setLoading] =useState<boolean>(false)
  const history=useHistory();
  const dispatch=useDispatch();
  var error:LooseObject={}
  var users:String[]=[];
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc:LooseObject) => {
      users.push(doc.data().email);
    });
  }).catch((err)=>{errorAlert("An error occured:"+err)});
  const onFinish = (values:LooseObject) => {
    setLoading(true);
    auth.createUserWithEmailAndPassword(values.Email, values.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      message.error(errorMessage,2)
      error={error:errorCode,message:errorMessage,value:values.Email};
      errorAlert(errorMessage)
      // ...
    })
    if (!('error' in error)){
      dispatch(updateUserState({email:values.Email,logged_in:true}))
      history.push("/")
      db.collection("users").add({ email :values.Email})
    }
    setTimeout(() => {  setLoading(false); },1200);
  };

  return (
  <Spin tip="...Validating request" className="App__search perfect_scroll accessform" spinning={loading}>
    <Form
      name="normal_login"
      className="accountform"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h2>Sign Up</h2>
      <Form.Item
        name="Email"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
                 
        ({ getFieldValue }) => ({
          validator(rule:any, value) {
            if (!(users.includes(value))) {
              return Promise.resolve();
            }
            return Promise.reject("Email already exist");
          },
        })
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' },          
        ({ getFieldValue }) => ({
          validator(rule:any, value) {
            if (value.length> 5) {
              return Promise.resolve();
            }
            return Promise.reject('Password is too short');
          },
        })]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule:any, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match!');
                },
              }),
            ]}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
          
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:"100%"}}  className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      <Form.Item>
      I have an account ?
         <Link to={SIGN_IN}>Sign In!</Link>
      </Form.Item>
    </Form>
  </Spin>
  );
};

export default SignUpForm