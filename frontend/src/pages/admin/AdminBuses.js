import React, { useEffect, useState } from 'react';
import Pagetitle from '../../components/pagetitle';
import Busform from '../../components/busform';
import { useDispatch } from 'react-redux';
import { Hideloading, Showloading } from '../../redux folder/alertSlice';
import { Table, message } from 'antd';
import { axiosInstance } from '../../helpers/axiosinstance';
import moment from 'moment';

function Adminbuses() {
  const dispatch = useDispatch();
  const [showbusform, setshowbusform] = React.useState(false);
  const [buses, setbuses] = useState([]);
  const [selectedbus, setselectedbus] = useState(null);

  const getbuses = async () => {
    try {
      dispatch(Showloading());
      const response = await axiosInstance.post('http://localhost:5000/buses/get-all-buses', {});
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

  const deleteBus = async (id) => {
    try {
      dispatch(Showloading(id));
      const response = await axiosInstance.post('http://localhost:5000/buses/delete-bus', {
        _id: id,
      });
      dispatch(Hideloading());
      if (response.data.success) {
        message.success(response.data.message);
        getbuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Book Name',
      dataIndex: 'name',
    },
    {
      title: 'Book Number',
      dataIndex: 'number',
    },
    {
      title: 'Author',
      dataIndex: 'from',
    },
    {
      title: 'Genre',
      dataIndex: 'to',
    },
    {
      title: 'Available Date',
      dataIndex: 'journeyDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-pencil-line"
            onClick={() => {
              setselectedbus(record);
              setshowbusform(true);
            }}
          ></i>
          <i
            class="ri-delete-bin-6-line"
            onClick={() => {
              deleteBus(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getbuses();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <Pagetitle title="Books List" />
        <button className="primary-btn" onClick={() => setshowbusform(true)}>
          Add Book
        </button>
      </div>

      <Table columns={columns} dataSource={buses} />
      {showbusform && (
        <Busform
          showbusform={showbusform}
          setshowbusform={setshowbusform}
          type={selectedbus ? 'edit' : 'add'}
          selectedbus={selectedbus}
          setselectedbus={setselectedbus}
          getdata={getbuses}
        />
      )}
    </div>
  );
}

export default Adminbuses;
