import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editCar, getAllCars } from "../../redux/actions/carsAction";
import Spinner from "../../components/Spinner/Spinner";

const EditCar = ({ match }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id == id.carid));
    }
  }, [cars]);

  const onFinish = (values) => {
    values._id = car._id;
    dispatch(editCar(values));
    console.log(values);
  };

  return (
    <>
      <DefaultLayout />
      {loading && <Spinner />}

      <Row justify="center" gutter={16} style={{marginTop:"7rem"}}>
        <Col lg={12} sm={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <div>
                <button className="loginBtn">EDIT CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default EditCar;