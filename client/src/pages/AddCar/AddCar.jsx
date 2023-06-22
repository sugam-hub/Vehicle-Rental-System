import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Col, Row, Form, Input, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../redux/actions/carsAction";
import Spinner from "../../components/Spinner/Spinner";
import Address from "../../components/Address/Address";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const AddCar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState("");
  const [address, setAddress] = useState("asdasd");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.otherInfo._id;

  const lat = selectPosition?.lat;
  const lon = selectPosition?.lon;

  const changeAddress = (item) => {
    console.log("ITEM", item);
    setSelectPosition(item);
    console.log("AD", address);
    // setSearchText(address);
    // console.log(fixAddress());
  };

  // const fixAddress = () => {
  //   return address;
  // };

  const onFinish = (values) => {
    values.bookedTimeSlots = [];
    values.lat = lat;
    values.lon = lon;
    values.user = userId;
    dispatch(addCar(values));
    console.log(values);
  };

  // const fixAddress = () => {
  //   useEffect(() => {
  //     setAddress(selectPosition?.display_name);
  //   }, [address]);
  // };

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
            <div>
              <button className="loginBtn">ADD CAR</button>
            </div>
          </Form>
          <button
            className="loginBtn"
            onClick={() => {
              console.log(address);
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
                      // setSelectPosition(item);
                      console.log("HERE", item);
                      console.log("HERE", item.display_name);

                      setAddress(item.display_name) && console.log(address);
                      // setAddress(item[0]?.display_name);
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

          <hr />

          <div>
            <button className="loginBtn">ADD CAR</button>
          </div>

          <div>{/* <Address /> */}</div>
          {/* </Form> */}
        </Col>
      </Row>
      {/* <Address /> */}
    </>
  );
};

export default AddCar;
