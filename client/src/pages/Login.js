import React from 'react'
import { Form, Input } from 'antd';
import '../styles/RegisterStyles.css';
import {Link} from 'react-router-dom';

const Login = () => {

  const onFinishHandler = (values) => {
    console.log(values);
  }

  return (
    <>
    <div className='form-container'>
        <Form layout="vertical" onFinish={onFinishHandler} className='register-form'>
          <h3 className='text-center'>Login form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to='/login' className='m-2'>Not a user? Register</Link>
          <button className='btn btn-primary' type="submit">Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login