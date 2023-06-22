import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import {
  getAllBookings,
  deleteBooking,
} from "../../redux/actions/bookingActions";
import { Col, Row, Popconfirm } from "antd";
import moment from "moment";
import Spinner from "../../components/Spinner/Spinner";

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalBookings, setTotalBookings] = useState([]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <>
      <div>
        <DefaultLayout />
        {loading && <Spinner />}
        <h3 className="text-center mt-2">My Bookings</h3>
        <Row justify="center" gutter={16}>
          <Col lg={20} sm={24}>
            {bookings
              .filter((o) => o.user == user.otherInfo._id)
              .map((booking) => {
                return (
                  <Row gutter={16} className="bs1 mt-3 text-left">
                    <Col lg={6} sm={24}>
                      <p>
                        <b>{booking.car.name}</b>
                      </p>
                      <p>
                        Total hours: <b>{booking.totalHours}</b>
                      </p>
                      <p>
                        Rent per hour: <b>{booking.car.price}</b>
                      </p>
                      <p>
                        Total amount: <b>{booking.totalAmount}</b>
                      </p>
                    </Col>
                    <Col lg={12} sm={24}>
                      <p>
                        {/* TransactionId: <b>{booking.transactionId}</b> */}
                      </p>
                      <p>
                        From: <b>{booking.bookedTimeSlots.from}</b>
                      </p>
                      <p>
                        To: <b>{booking.bookedTimeSlots.to}</b>
                      </p>
                      <p>
                        Date of booking:{" "}
                        <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                      </p>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this booking?"
                        onConfirm={() => {
                          dispatch(deleteBooking({ bookingid: booking._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="loginBtn">Delete Booking</button>
                      </Popconfirm>
                    </Col>
                    <Col lg={6} sm={24} className="text-right">
                      <img
                        src={booking.car.image}
                        height="140"
                        className="p-2"
                      />
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserBookings;
