import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Home = () => {

  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div>Home</div>
    </Layout>
  )
}

export default Home