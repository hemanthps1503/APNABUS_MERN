import { message } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux folder/usersslice';
import { Hideloading, Showloading } from '../redux folder/alertSlice';
import DefaultLayout from './defaultlayout';

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.alerts);

  const navigate = useNavigate();
  const validateToken = useCallback(async () => {
    try {
      dispatch(Showloading());
      const response = await axios.post(
        'https://apnabus-mern.onrender.com/users/get-user-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(Hideloading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.removeItem('token');
        message.error(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      dispatch(Hideloading());
      localStorage.removeItem('token');

      message.error(error.message);
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    } else {
      navigate('/login');
    }
  }, [validateToken, navigate]);

  return <div>{!user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
