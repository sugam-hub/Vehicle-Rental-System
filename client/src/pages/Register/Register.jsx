import React, { useState } from "react";
import { Row, Col, Form, Input, Divider } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/actions/userActions";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const Register = () => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState("");
  const [itemSelected, setItemSelected] = useState(false);
  const [value, setValue] = useState();
  console.log(searchText);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleListItemClick = (item) => {
    setSelectPosition(item);
    setSearchText(item.display_name);
    setLat(item.lat);
    setLon(item.lon);
    setItemSelected(true);
    setListPlace([]);
  };

  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values);
    values.address = searchText;
    values.lat = lat;
    values.lon = lon;
    dispatch(userRegister(values));
  };
  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={12} style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBjYXJ8ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
          <h1 className="login-logo">Rent A Vehicle</h1>
        </Col>
        <Col lg={12} className="text-left" style={{paddingRight:"7rem"}}>
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Username</p>}
              rules={[{ required: true }]}
            >
             <Input size="large" style={{fontSize:"18px"}}/>
            </Form.Item>
              
            <Form.Item name="email"  rules={[{ required: true }]} label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Email</p>}>
            <Input size="large" style={{fontSize:"18px"}}/>
            </Form.Item>
            <Form.Item
              name="phone"
           
              label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Phone number</p>}
              rules={[{ required: true }]}
            >
             <Input size="large" style={{fontSize:"18px"}}/>
            </Form.Item>
            <div style={{display: "flex", alignItems: "center"}}>
              <p style={{color: "#ff4d4f", marginLeft: '-5px', marginRight: '3px'}}>*</p>
              <label style={{marginLeft: "-3px",fontSize: "20px" ,color:"#fff"}}>Address</label>
            </div>
            
            <div style={{display: "flex", height: "30px", alignItems: "center", justifyContent: "center", marginTop: "10px"}}>
            <input
              value={searchText}
              style={{width: "95%", height: "40px", padding: "4px 11px", borderRadius: "7px",fontSize:"18px", marginLeft: ""}}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />

            <p
              // className="loginBtn"
              style={{ width: "60px",height: "32px", padding: "5px", color: "black", borderRadius: "5px", backgroundColor: "#eff6fd", cursor: "pointer"}}
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
            </p>
            </div>
            <List component="nav" aria-label="main mailbox folders">
              {listPlace.map((item) => {
                return (
                  <div key={item?.place_id}>
                    <ListItem button onClick={() => handleListItemClick(item)}>
                      <ListItemIcon>
                        <img
                          src="/placeholder.png"
                          alt="Placeholder"
                          style={{ width: "38px", height: "38px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item?.display_name} style={{color:"#fff",marginBottom:"0px"}} />
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>

           
            <Form.Item
              name="password"
              label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Password</p>}
              rules={[{ required: true }]}
            >
              <Input.Password size="large" style={{backgroundColor:"#292929" ,border:0,fontSize:"18px"}} className="eye" />

              {/* <div style={{display: "flex", height: "30px", alignItems: "center", justifyContent: "center"}}>
              <Input type={showPassword ? "text" : "password"} />
              <p style={{border: '1px solid orangered', width: "50px",height: "30px", padding: "5px", color: "orangered", borderRadius: "5px", backgroundColor: "white", cursor: "pointer"}} onClick={handlePassword}>{showPassword ? "Hide" : "Show"}</p>
              </div> */}
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Confirm Password</p>}
              rules={[{ required: true }]}
            >
              <Input.Password size="large" style={{backgroundColor:"#292929" ,border:0,fontSize:"18px"}} className="eye" />

              {/* <div style={{display: "flex", height: "30px", alignItems: "center", justifyContent: "center"}}>
              <Input type={showConfirmPassword ? "text" : "password"} />
              <p style={{border: '1px solid orangered', width: "50px",height: "30px", padding: "5px", color: "orangered", borderRadius: "5px", backgroundColor: "white", cursor: "pointer"}} onClick={handleConfirmPassword}>{showConfirmPassword ? "Hide" : "Show"}</p>
              </div> */}
            </Form.Item>

            <button className="loginBtn" style={{width:"41.5vw",fontSize:"20px"}}>Register</button>
            <br />
            <Link style={{ textDecoration: "none", fontSize: "20px", marginTop: "5px"}} to="/login">
              Click here to login
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
