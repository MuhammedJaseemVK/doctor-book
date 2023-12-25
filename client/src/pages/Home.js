import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const Home = () => {

  const [doctors, setDoctors] = useState(null);
  const getAllDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/user/get-all-doctors', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home</h1>
      <Row>
        {
          doctors && (doctors.map((doctor)=>(<DoctorList doctor={doctor} />)))
        }
      </Row>
    </Layout>
  )
}

export default Home