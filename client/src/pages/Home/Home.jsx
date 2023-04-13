import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { getAllCars } from "../../redux/actions/carsAction";

const Home = () => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  return (
    <>
      <DefaultLayout />
      <div>
        <h1>Home</h1>
        <h1>The length of cars array is {cars.length}</h1>
      </div>
    </>
  );
};

export default Home;
