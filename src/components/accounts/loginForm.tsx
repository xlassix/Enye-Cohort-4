import React, { useState, useEffect } from "react"
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { auth } from "../../firebase/config"
import { Link } from 'react-router-dom';
import { SIGN_UP } from '../../routes/all';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import { updateUserState } from "../../store/user/actions"

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white', margin: '0 5px' }} spin />

interface LooseObject {
  [key: string]: any
}

const LoginForm = () => {

  const [pwdErrors, setPwdErrors] = useState<LooseObject>({ status: "", message: null })
  const [emailErrors, setEmailErrors] = useState<LooseObject>({ status: "", message: null })
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    if (pwdErrors.status !== "") {
      form.validateFields(['Email', "password"]);
    }
  }, [pwdErrors, emailErrors]);

  const onFinish = (values: LooseObject) => {

    setLoading(true)

    auth.signInWithEmailAndPassword(values.Email, values.password)
      .then((userInstance: any) => {
        dispatch(updateUserState({ userId: userInstance.user.uid, logged_in: true,histories:[] }))
        history.push("/")
      })
      .catch(function (error) {

        if (error.code.includes("user")) {
          if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
            setEmailErrors({ status: "error", message: "Email not found" })
          } else {
            setEmailErrors({ status: "error", message: error.message })
          }
        } else {
          if (error.message === "The password is invalid or the user does not have a password.") {
            setPwdErrors({ status: "error", message: "Invalid password" })
          } else {
            setPwdErrors({ status: "error", message: error.message })
          }
        }

      }).then(() => setLoading(false));
  };

  return (
    <div className="App__search perfect_scroll accessform">
      <Form form={form}
        name="normal_login"
        className="accountform"
        initialValues={{ remember: true }}
        onFinish={onFinish}>

        <h2>Sign IN</h2>

        <Form.Item
          name="Email"
          help={emailErrors.message}
          validateStatus={emailErrors.status}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          help={pwdErrors.message}
          validateStatus={pwdErrors.status}
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} className="login-form-button">
            Log in
            <Spin indicator={antIcon} spinning={loading} />
          </Button>
        </Form.Item>
        <Form.Item>
          I dont have an account ?
          <Link to={SIGN_UP}>Sign Up! </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm