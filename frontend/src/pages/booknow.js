import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../helpers/axiosinstance';
import { Hideloading, Showloading } from '../redux folder/alertSlice';
import { Col, Row, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Seatselection from '../components/seatselection';
import StripeCheckout from 'react-stripe-checkout';

function Booknow() {
  const [selectedseats, setselectedseats] = useState([]);
  const { user } = useSelector((state) => state.users);
  const params = useParams();
  const navigate = useNavigate();

  const [bus, setbus] = useState(null);
  const dispatch = useDispatch();

  const getbus = async () => {
    try {
      dispatch(Showloading());
      const response = await axiosInstance.post('https://apnabus-mern.onrender.com/buses/get-bus-by-id', {
        _id: params.id,
      });
      dispatch(Hideloading());
      if (response.data.success) {
        setbus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };
  const booknow = async (transactionId) => {
    try {
      dispatch(Showloading());
      const response = await axiosInstance.post('https://apnabus-mern.onrender.com/bookings/book-seat', {
        bus: bus._id,
        seats: selectedseats,
        transactionId,
      });
      dispatch(Hideloading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/bookings');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };
  const onToken = async (token) => {
    try {
      dispatch(Showloading());
      const response = await axiosInstance.post('https://apnabus-mern.onrender.com/bookings/make-payment', {
        token,
        amount: selectedseats.length * bus.fare * 100,
      });
      dispatch(Hideloading());
      if (response.data.success) {
        message.success(response.data.message);
        booknow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getbus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={(30, 30)}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-xl primary-text">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from}-{bus.to}
            </h1>
            <hr />
            <div className="flex flex-col gap-2">
              <p className="text-md">Available Date:{bus.journeyDate}</p>
              <p className="text-md">Edition:{bus.fare}-th </p>
              <p className="text-md">Due Date: {bus.departure}</p>
              <p className="text-md">Available Books : {bus.capacity}</p>
              <p className="text-md">
                Books left: {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">
                Book's Token : {selectedseats.join(', ')}
              </h1>
              <h1 className="text-2xl mt-2">
                Breakage fee : {bus.fare * selectedseats.length}/-
              </h1>
              <hr />
              <StripeCheckout
                billingAddress
                token={onToken}
                amount={bus.fare * selectedseats.length * 100}
                currency="INR"
                stripeKey="pk_test_51NiHxVSFjJ8qlHRixOZsQhiKPAKpf4vRuLURW3DVbtbJGXjtTYwcgzUqNu2yWs3oHsjFpsZpZs17zoVz4QcFtkXu005y3VfboM"
              >
                <button
                  className={` primary-btn ${
                    selectedseats.length === 0 && 'disabled-btn'
                  }`}
                  disabled={selectedseats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <Seatselection
              selectedseats={selectedseats}
              setselectedseats={setselectedseats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Booknow;
