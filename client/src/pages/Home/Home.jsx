import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { getAllCars } from "../../redux/actions/carsAction";
import { Row, Col, Divider, DatePicker, Checkbox, Input } from "antd";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  const { Search } = Input;

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  // Filtering on the basic of availability
  const setFilter = (values) => {
    var selectedFrom = moment(values[0].$d, "MMM DD YYYY HH:mm");
    var selectedTo = moment(values[1].$d, "MMM DD YYYY HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }
    setTotalCars(temp);
  };

  const onSearch = () => {};

  return (
    // gutter is used for margin
    <>
      <DefaultLayout />

      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={setFilter}
          />
          <Col
            lg={8}
            sm={24}
            className="d-flex"
            style={{ marginLeft: "200px" }}
          >
            <Search
              placeholder="Search for car"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Col>
        </Col>
      </Row>

      {loading == true && <Spinner />}
      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          const { name, price, image, _id } = car;
          return (
            <Col key={_id} lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{name}</p>
                    <p>Rent Per Hour {price} /-</p>
                  </div>
                  <div>
                    <button className="btn1">
                      <Link
                        to={`/booking/${_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Book Now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
