import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  carStatusAccepted,
  carStatusRejected,
} from "../../redux/actions/bookingActions";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row } from "antd";
import moment from "moment";
import Spinner from "../../components/Spinner/Spinner";
import DefaultLayout1 from "../../components/DefaultLayout/DefaultLayout";

const Notification = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.otherInfo._id;
  const [status, setStatus] = useState(false);
  const [car, setCar] = useState();
  const [carId, setCarId] = useState();
  const [bookingUserId, setBookingUserId] = useState();

  useEffect(() => {
    try {
      if (bookings.length == 0) {
        dispatch(getAllBookings());
        setCar(bookings.find((o) => o.car));
        setCarId(car.car._id);
        console.log(carId);
        setBookingUserId(car.user);
        console.log(bookingUserId);
      }
    } catch (err) {
      console.log(err);
    }
  }, [bookings]);

  const handleAcceptStatus = (e) => {
    setStatus(true);

    const reqObj = {
      car: carId,
      user: bookingUserId,
      status: status,
    };
    dispatch(carStatusAccepted(reqObj));
  };

  const handleRejectStatus = (e) => {
    setStatus(false);
    const reqObj = {
      car: carId,
      user: bookingUserId,
      status: status,
    };
    dispatch(carStatusRejected(reqObj));
  };

  return (
    <>
      <div>
        <DefaultLayout />
        {/* {loading && <Spinner />} */}
        <h3 className="text-center" style={{marginTop: "6rem"}}>Notifications</h3>

        {user ? (
          <Row justify="center" gutter={16} >
            <Col lg={20} sm={24}>
              {bookings
                .filter((o) => o.car.user == userId)
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
                      <Col lg={6} sm={24}>
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
                          <b>
                            {moment(booking.createdAt).format("MMM DD yyyy")}
                          </b>
                        </p>
                        <p>
                          Transaction Id: <b>{booking.transactionId}</b>
                        </p>
                      </Col>

                      <Col lg={6} sm={24} className="text-right">
                        <h5>BOOKED BY</h5>
                        <p>
                          Name: <b>{booking.user.name}</b>
                        </p>
                        <p>
                          Address: <b>{booking.user.address}</b>
                        </p>
                        <p>
                          Phone Number: <b>{booking.user.phone}</b>
                        </p>
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
        ) : (
          <p>No user found</p>
        )}
      </div>
    </>
  );
};

export default Notification;
