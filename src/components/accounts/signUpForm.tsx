import React, { useState } from "react"
import { Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { auth } from "../../firebase/config"
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../../routes/all';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updateUserState } from "../../store/user/actions"

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white', margin: '0 5px' }} spin />
interface LooseObject {
  [key: string]: any
}

const errorAlert = (info: string) => {
  message.error(info, 3.5);
};



const SignUpForm = () => {

  //initialisations
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory();
  const dispatch = useDispatch();


  //Handle the  submit event for the SignUpForm
  const onFinish = (values: LooseObject) => {
    setLoading(true);
    auth.createUserWithEmailAndPassword(values.Email, values.password)
      .then((new_user: any) => {
        dispatch(updateUserState({ userId: new_user.user.uid, logged_in: true,histories:[] }))
        history.push("/")
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        errorAlert(errorMessage)
        // ...
      }).then(() => setLoading(false))
  };

  return (
    <div className="App__search perfect_scroll accessform" >
      <Form
        name="normal_login"
        className="accountform"
        initialValues={{ remember: true }}
        onFinish={onFinish}>


        <h2>Sign Up</h2>

        <Form.Item
          name="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>


        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' },
          ({ getFieldValue }) => ({
            validator(rule: any, value) {
              if (value.length > 5) {
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
              validator(rule: any, value) {
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
            placeholder="Confirm Password" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} className="login-form-button">
            Sign Up 
          <Spin indicator={antIcon} spinning={loading} />
          </Button>
        </Form.Item>

        <Form.Item>
          I have an account ?
         <Link to={SIGN_IN}> Sign In!</Link>
        </Form.Item>

      </Form>
    </div>
  );
};

export default SignUpForm