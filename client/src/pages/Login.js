import React from 'react'
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token',res.data.token)
        message.success("User logined successfully");
        navigate('/');
      }
      else {
        message.error(res.data.message);
      }
    }
    catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
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