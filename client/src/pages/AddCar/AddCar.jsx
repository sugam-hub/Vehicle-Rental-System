import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row, Form, Input, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../redux/actions/carsAction";
import Spinner from "../../components/Spinner/Spinner";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

// import { Cloudinary } from "@cloudinary/base";
// import { AdvancedImage } from "@cloudinary/react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const CLOUDINARY_UPLOAD_PRESET = "v35qow1m";
const CLOUDINARY_CLOUD_NAME = "dryaouz83";

const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const AddCar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const [itemSelected, setItemSelected] = useState(false);
  const [address, setAddress] = useState("asdasd");
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState("");
  const [image, setImage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.otherInfo._id;
  const isAdmin = user.otherInfo.isAdmin;

  const lat = Number(selectPosition?.lat);
  const lon = Number(selectPosition?.lon);

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
  
  

  const onFinish = (values) => {
    values.bookedTimeSlots = [];
    values.location = {
      type: "Point",
      coordinates: [lon, lat],
    };
    values.user = userId;
    values.image = image; 
    dispatch(addCar(values));
  };

  return (
    <>
      {isAdmin ? <AdminHeader /> : <DefaultLayout />}
      {loading && <Spinner />}

      <Row justify="center " style={{ marginTop: "7rem" }}>
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
            {/* <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: false }]}
            >
              {/* Input for the Cloudinary image URL */}
              {/* <Input value={image} disabled />
            </Form.Item>  */}
            {/* Input for selecting an image file */}
            <Form.Item name="image" label="Upload Image">
              <Input type="file" onChange={handleImageChange} />
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
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input
                value={address}
                // initialValue={address}
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
              />
            </Form.Item>
            <button
              className="loginBtn"
              onClick={(e) => {
                e.preventDefault();
                const params = {
                  q: searchText,
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(JSON.parse(result));
                    setListPlace(JSON.parse(result));
                  })
                  .catch((err) => {
                    console.log("err: ", err);
                  });
              }}
            >
              Search
            </button>
            <List component="nav" aria-label="main mailbox folders">
              {listPlace.map((item) => {
                return (
                  <div key={item?.place_id}>
                    <ListItem
                      button
                      onClick={() => {
                        console.log("HERE", item);
                        console.log("HERE", item.display_name);
                        setSelectPosition(item);
                        setAddress(item.display_name) && console.log(address);
                        setItemSelected(true);
                        setListPlace([]);
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src="/placeholder.png"
                          alt="Placeholder"
                          style={{ width: "38px", height: "38px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item?.display_name} />
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>

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
