import React, { useEffect, useState } from 'react';
import Pagetitle from '../../components/pagetitle';
import Busform from '../../components/busform';
import { useDispatch } from 'react-redux';
import { Hideloading, Showloading } from '../../redux folder/alertSlice';
import { Table, message } from 'antd';
import { axiosInstance } from '../../helpers/axiosinstance';
import moment from 'moment';

function Adminusers() {
  const dispatch = useDispatch();

  const [users, setusers] = useState([]);

  const getusers = async () => {
    try {
      dispatch(Showloading());
      const response = await axiosInstance.post('https://apnabus-mern.onrender.com/users/get-all-users', {});
      dispatch(Hideloading());
      if (response.data.success) {
        setusers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const updateuserpermissions = async (user, action) => {
    try {
      let payload = null;
      if (action === 'make-admin') {
        payload = {
          ...user,
          isadmin: true,
        };
      } else if (action === 'remove-admin') {
        payload = {
          ...user,
          isadmin: false,
        };
      } else if (action === 'block') {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === 'unblock') {
        payload = {
          ...user,
          isBlocked: false,
        };
      }

      dispatch(Showloading());
      const response = await axiosInstance.post(
        'https://apnabus-mern.onrender.com/users/update-user-permissions',
        payload
      );
      dispatch(Hideloading());
      if (response.data.success) {
        getusers();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: '',
      render: (data) => {
        return data.isBlocked ? 'Blocked' : 'Active';
      },
    },
    {
      title: 'Role',
      dataIndex: '',
      render: (data) => {
        if (data?.isadmin) {
          return 'Admin';
        } else {
          return 'User';
        }
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      render: (action, record) => (
        <div className="d-flex gap-3">
          {record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateuserpermissions(record, 'unblock')}
            >
              UnBlock
            </p>
          )}

          {!record?.isBlocked && (
            <p
              className="underline"
              onClick={() => updateuserpermissions(record, 'block')}
            >
              Block
            </p>
          )}
          {record?.isadmin && (
            <p
              className="underline"
              onClick={() => updateuserpermissions(record, 'remove-admin')}
            >
              Remove Admin
            </p>
          )}
          {!record?.isadmin && (
            <p
              className="underline"
              onClick={() => updateuserpermissions(record, 'make-admin')}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getusers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <Pagetitle title="Users" />
      </div>

      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Adminusers;
