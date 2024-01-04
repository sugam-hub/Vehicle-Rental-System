import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsAction";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../../redux/actions/bookingActions";

import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

const BookingVehicle = ({ match }) => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const id = useParams();

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const isTimeSlotBooked = (timeSlot) => {
    if (car.bookedTimeSlots && car.bookedTimeSlots.length > 0) {
      for (const bookedSlot of car.bookedTimeSlots) {
        const bookedFrom = moment(bookedSlot.from, "MMM DD YYYY HH:mm");
        const bookedTo = moment(bookedSlot.to, "MMM DD YYYY HH:mm");

        // Check if there is an overlap between the selected timeSlot and the bookedSlot
        if (
          timeSlot.isBetween(bookedFrom, bookedTo) ||
          timeSlot.isSame(bookedFrom) ||
          timeSlot.isSame(bookedTo)
        ) {
          return true; // Disable the timeSlot if it overlaps with a bookedSlot
        }
      }
    }
    return false; // Enable the timeSlot if no overlap was found
  };

  const disabledDate = (current) => {
    if (!current || !car.bookedTimeSlots || car.bookedTimeSlots.length === 0) {
      return false; // No bookings or invalid date, enable all dates
    }

    // Disable dates if any part of the day is booked
    return car.bookedTimeSlots.some((bookedSlot) => {
      const bookedFrom = moment(bookedSlot.from, "MMM DD YYYY HH:mm");
      const bookedTo = moment(bookedSlot.to, "MMM DD YYYY HH:mm");

      // Disable the date if any part of the day is booked
      return (
        current.isSame(bookedFrom, "day") ||
        (current.isSame(bookedTo, "day") && current.isAfter(bookedTo, "day"))
      );
    });
  };

  const disabledTime = (current, type) => {
    if (!current || !car.bookedTimeSlots || car.bookedTimeSlots.length === 0) {
      return {}; // No bookings or invalid date, enable all times
    }

    if (type === "start" || type === "end") {
      const disabledHours = [];
      const disabledMinutes = [];

      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeSlot = current.clone().hour(hour).minute(minute);

          if (isTimeSlotBooked1(timeSlot)) {
            if (type === "start") {
              disabledHours.push(hour);
              disabledMinutes.push(minute);
            } else if (type === "end") {
              disabledHours.push(hour);
              disabledMinutes.push(minute + 30);
            }
          }
        }
      }

      return {
        disabledHours: () => disabledHours,
        disabledMinutes: () => disabledMinutes,
      };
    }

    return {};
  };

  const isTimeSlotBooked1 = (timeSlot) => {
    if (car.bookedTimeSlots && car.bookedTimeSlots.length > 0) {
      for (const bookedSlot of car.bookedTimeSlots) {
        const bookedFrom = moment(bookedSlot.from, "MMM DD YYYY HH:mm");
        const bookedTo = moment(bookedSlot.to, "MMM DD YYYY HH:mm");

        // Check if there is an overlap between the selected timeSlot and the bookedSlot
        if (timeSlot.isAfter(bookedFrom) && timeSlot.isBefore(bookedTo)) {
          return true; // Disable the timeSlot if it overlaps with a bookedSlot
        }
      }
    }
    return false; // Enable the timeSlot if no overlap was found
  };

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id == id.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.price + (driver &&  100));
    // setTotalAmount()
  }, [driver, totalHours]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
    setTo(moment(values[1].$d).format("MMM DD YYYY HH:mm"));
    const to = moment(values[1].$d);
    const from = moment(values[0].$d);
    setTotalHours(to.diff(from, "hours"));
  };

  const bookNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.otherInfo._id;
    const reqObj = {
      user: userId,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  };

  const onToken = (token) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.otherInfo._id;
    const reqObj = {
      token,
      user: userId,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  };

  return (
    <>
      <DefaultLayout />
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh", marginTop: "7rem" }}
      >
        <Col lg={12} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right align-items-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.price} Rent per hour /-</p>
            <p>Fuel Type = {car.fuelType}</p>
            <p>Max Persons = {car.capacity}</p>
            <p>Location = {car.address}</p>
            <p>Phone Number = {car.phone}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              justifyItems: "right",
              alignItems: "right",
            }}
          >
            <RangePicker
              style={{ width: "auto", alignItems: "right", marginLeft: "60px", height: "40px" }}
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlots}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
            />
            <button
              className="loginBtn mt-2"
              style={{marginLeft: "60px", width: "740px"}}
              onClick={() => {
                setShowModal(true);
              }}
            >
              See Booked Slots
            </button>
            {from && to && (
              <>
                <div style={{ textAlign: "right" }}>
                  <p>
                    Total hours = <b> {totalHours}</b>
                  </p>
                  <p>
                    Rent per hour = <b> {car.price}</b>
                  </p>
                  {/* <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDriver(true);
                      } else {
                        setDriver(false);
                      }
                    }}
                  >
                    Delivery
                  </Checkbox> */}
                  <h3>Total Amount = {totalAmount}</h3>
                </div>

                <StripeCheckout
                  shippingAddress
                  token={onToken}
                  amount={totalAmount * 100}
                  currency="npr"
                  stripeKey="pk_test_51LeyE8HhWz2IA4nkPPcDp3w6IyY1dKZG4VYmJauWx5C66iPe30Zy1x5MZS7wsNUpyTuLrz0FQf6AM5k6wq87oWCE00L2NQAfRO"
                  onClick={bookNow}
                >
                  <button className="loginBtn">Book Now</button>
                </StripeCheckout>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Modal
        open={showModal}
        closable={false}
        footer={false}
        title="Booked Time Slots"
      >
        {car && (
          <div className="p-2">
            {car.bookedTimeSlots?.map((slot) => {
              return (
                <button className="loginBtn mt-2">
                  {slot.from} - {slot.to}
                </button>
              );
            })}

            <div className="mt-4" style={{ alignItems: "end" }}>
              <button
                className="loginBtn"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookingVehicle;
