import React from 'react';
import { Col, Form, Modal, Row, message } from 'antd';
import { axiosInstance } from '../helpers/axiosinstance';
import { useDispatch } from 'react-redux';
import { Hideloading, Showloading } from '../redux folder/alertSlice';

function Busform({
  showbusform,
  setshowbusform,
  type = 'add',
  getdata,
  selectedbus,
  setselectedbus,
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      let response = null;
      if (type === 'add') {
        response = await axiosInstance.post('https://apnabus-mern.onrender.com/buses/add-bus', values);
      } else {
        response = await axiosInstance.post('https://apnabus-mern.onrender.com/buses/update-bus', {
          ...values,
          _id: selectedbus._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getdata();
      setshowbusform(false);
      setselectedbus(null);
      dispatch(Hideloading());
    } catch (error) {
      message.error(error.message);
      dispatch(Hideloading());
    }
  };
  return (
    <Modal
      width={800}
      title={type === 'add' ? 'Add Bus' : 'Update Bus'}
      visible={showbusform}
      onCancel={() => {
        setshowbusform(false);
        setselectedbus(null);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedbus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Book Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Book No" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Available Books" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Author" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Genre" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Available Date" name="journeyDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Due date" name="departure">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Due time" name="arrival">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
              <select name="" id="">
                <option value="AC">Membership</option>
                <option value="Non-AC">Non-Membership</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Edition" name="fare">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select name="" id="">
                <option value="Booked">Booked</option>
                <option value="Not Booked">Not Booked</option>
                <option value="Returned">Returned</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default Busform;
