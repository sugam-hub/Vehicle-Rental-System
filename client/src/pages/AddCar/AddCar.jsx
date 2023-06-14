import React from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../redux/actions/carsAction";
import Spinner from "../../components/Spinner/Spinner";

const AddCar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    values.bookedTImeSlots = [];
    dispatch(addCar(values));
    console.log(values);
  };

  return (
    <>
      <DefaultLayout />
      {loading && <Spinner />}

      <Row justify="center mt-4">
        <Col lg={12} sm={24}>
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
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
              <button className="loginBtn">ADD CAR</button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddCar;
