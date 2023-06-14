import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsAction";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../../redux/actions/bookingActions";

const { RangePicker } = DatePicker;

const BookingVehicle = ({ match }) => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id == id.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.price + (driver && totalHours * 30));
  }, [driver, totalHours]);

  const selectTimeSlots = (values) => {
    setFrom(moment(values[0].$d).format("MMM DD YYYY HH:mm"));
    setTo(moment(values[1].$d).format("MMM DD YYYY HH:mm"));
    const to = moment(values[1].$d);
    const from = moment(values[0].$d);
    setTotalHours(to.diff(from, "hours"));
    console.log(values);
    console.log(totalHours);
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

  return (
    <>
      <DefaultLayout />
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
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
              style={{ width: "auto", alignItems: "right", marginLeft: "60px" }}
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlots}
            />
            <button
              className="bookBtn mt-2"
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
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDriver(true);
                      } else {
                        setDriver(false);
                      }
                    }}
                  >
                    Driver Required
                  </Checkbox>
                  <h3>Total Amount = {totalAmount}</h3>
                </div>
                <button className="bookBtn" onClick={bookNow}>
                  Book Now
                </button>
              </>
            )}
          </div>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        closable={false}
        footer={false}
        title="Booked Time Slots"
      >
        {car && (
          <div className="p-2">
            {car.bookedTimeSlots?.map((slot) => {
              return (
                <button className="bookedTimeSlot mt-2">
                  {slot.from} - {slot.to}
                </button>
              );
            })}

            <div className="mt-4" style={{ alignItems: "end" }}>
              <button
                className="closeBtn"
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
