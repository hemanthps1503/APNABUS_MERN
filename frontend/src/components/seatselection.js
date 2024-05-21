import React from 'react';
import { Row, Col } from 'antd';
import '../resources/bus.css';

function Seatselection({ selectedseats, setselectedseats, bus }) {
  const capacity = bus.capacity;
  const selectorunselectedseats = (seatnumber) => {
    if (selectedseats.includes(seatnumber)) {
      setselectedseats(selectedseats.filter((seat) => seat !== seatnumber));
    } else {
      setselectedseats([...selectedseats, seatnumber]);
    }
  };

  return (
    <div className="mx-5">
      <div className="bus-container">
        <Row gutter={(10, 10)}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass = '';
            if (selectedseats.includes(seat + 1)) {
              seatClass = 'selected-seat';
            } else if (bus.seatsBooked.includes(seat + 1)) {
              seatClass = 'booked-seat';
            }
            return (
              <Col span={6}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectorunselectedseats(seat + 1)}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Seatselection;
