import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { deleteCar, getAllCars } from "../../redux/actions/carsAction";
import { Row, Col, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";
import moment from "moment";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const AdminHome = () => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  return (
    // gutter is used for margin
    <>
      <DefaultLayout  />
      {/* <h2>asdsad</h2> */}

      <Row justify="center" gutter="16" style={{marginTop: "7rem"}} >
        <Col lg={20} sm={24}>
          
          <button className="loginBtn">
            <a href="/addcar" style={{ textDecoration: "none" }}>
              ADD VEHICLE
            </a>
          </button>
        </Col>
      </Row>

      {loading == true && <Spinner />}
        <Row justify="center" gutter={16}>
          {totalCars
            .filter((o) => o.user == user.otherInfo._id)
            .map((car) => {
              const { name, price, image, _id } = car;
              return (
                <Col key={_id} lg={5} sm={24} xs={24}>
                  <div className="car p-2 bs1">
                    <img src={image} className="carimg" />

                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div className="text-left pl-2">
                        <p style={{fontSize: "18px"}}>{name}</p>
                        <p>Rent Per Hour {price} /-</p>
                      </div>
                      <div className="mr-4">
                        <Link to={`/editcar/${car._id}`}>
                          <EditOutlined
                            style={{
                              marginRight: "15px",
                              color: "green",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this car?"
                          onConfirm={() => {
                            dispatch(deleteCar({ carid: car._id }));
                          }}
                          okText="Yes"
                          cancelText="No"
                          style="custom-popconfirm"
                        >
                          <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </Popconfirm>
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

export default AdminHome;
