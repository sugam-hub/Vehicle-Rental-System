import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { getAllCars } from "../../redux/actions/carsAction";
import { Row, Col } from "antd";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  return (
    // gutter is used for margin
    <>
      <DefaultLayout />

      {loading == true && <Spinner />}
      <Row justify="center" gutter={16} className="mt-5">
        {cars.map((car) => {
          console.log(car);
          const { name, brand, price, image, _id } = car;
          console.log(name);
          return (
            <Col key={_id} lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <p>{name}</p>
                    <p>{price} Rent Per Hour /-</p>
                  </div>
                  <div>
                    <button className="btn1">Book Now</button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* <Box>
        {cars.map((car) => {
          return (
            <Card key={car._id}>
              <CardContent>
                <Typography>{car.name}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box> */}
    </>
  );
};

export default Home;
