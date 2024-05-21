import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../helpers/axiosinstance';
import { Hideloading, Showloading } from '../redux folder/alertSlice';
import { Col, Row, message } from 'antd';
import Bus from '../components/bus';
import axios from 'axios';

function Home() {
  const { user } = useSelector((state) => state.users);
  const [buses, setbuses] = useState([]);
  const dispatch = useDispatch();
  const getbuses = async () => {
    try {
      dispatch(Showloading());
      const response = await axios.post(
        'https://apnabus-mern.onrender.com/buses/get-all-buses',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(Hideloading());
      if (response.data.success) {
        setbuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getbuses();
  }, []);
  return (
    <div>
      <div></div>
      <div>
        <Row gutter={(15, 15)}>
          {buses
            .filter((bus) => bus.status === 'Not Booked')
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
