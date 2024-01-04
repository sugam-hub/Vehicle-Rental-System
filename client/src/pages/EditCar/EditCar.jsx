import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editCar, getAllCars } from "../../redux/actions/carsAction";
import Spinner from "../../components/Spinner/Spinner";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const CLOUDINARY_UPLOAD_PRESET = "v35qow1m";
const CLOUDINARY_CLOUD_NAME = "dryaouz83";

const EditCar = ({ match }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
const admin = user.otherInfo.isAdmin;
console.log(admin)

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
  
    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

  
      if (!response.ok) {
        // Handle Cloudinary upload error
        console.error(`Cloudinary Upload Failed: ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log(data.secure_url)
      setImage(data.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <>

      {admin ? <AdminHeader/> :
      <DefaultLayout />
    }  
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
                 <Input onChange={handleImageChange} disabled
                 />
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