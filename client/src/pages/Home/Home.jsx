import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { getAllCars } from "../../redux/actions/carsAction";
import { nearestVehicle } from "../../redux/actions/nearestVehiclesAction";
import { Row, Col, Divider, DatePicker, Checkbox, Input, Pagination } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
  const { cars } = useSelector((state) => state.vehiclesReducer);
  const { nearestVehicles } = useSelector((state) => state.nearestVehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const { search } = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const [totalCars, setTotalCars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalNearestVehicles, setTotalNearestVehicles] = useState([]);
  const { Search } = Input;
  const user = JSON.parse(localStorage.getItem("user"));

  const latitude = user.otherInfo.lat;
  const longitude = user.otherInfo.lon;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = totalCars.slice(indexOfFirstCar, indexOfLastCar);

  const [filteredCars, setFilteredCars] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    dispatch(nearestVehicle({ latitude, longitude }));
  }, [latitude, longitude]);

  useEffect(() => {
    setTotalNearestVehicles(nearestVehicles);
  }, [nearestVehicles]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  // Filtering on the basis of availability
  const setFilter = (values) => {
    var selectedFrom = moment(values[0].$d, "MMM DD YYYY HH:mm");
    var selectedTo = moment(values[1].$d, "MMM DD YYYY HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length === 0) {
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

  const handleSearchButtonClick = () => {
    const filtered = totalCars.filter((car) =>
      car.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      car.user !== user.otherInfo._id
    );

    setFilteredCars(filtered);
    setSearchClicked(true); 
  };

  const handleSearchClear = () => {
    setSearchInput(""); 
    setFilteredCars([]); 
    setSearchClicked(false); 
  };

  const datePickerStyle = {
    width: "800px",
  };

  const searchInputStyle = {
    width: "800px",
  };

  return (
    <>
      <DefaultLayout />
      <Row style={{ marginTop: "7rem" }} justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left" style={{marginBottom: "40px"}} >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={setFilter}
            size="large"
            style={datePickerStyle} 
          />
          <Col lg={8} sm={24} className="d-flex" style={{ marginLeft: "600px" }}>
            <Search
              placeholder="Search for car"
              allowClear
              enterButton="Search"
              size="large"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={() => setSearchClicked(false)} 
              onSearch={handleSearchButtonClick}
              onClear={handleSearchClear}
              style={searchInputStyle}
            />
          </Col>
        </Col>
      </Row>

      {loading && <Spinner />}
      
      {totalCars.length === 0 && !loading && (
        <Row justify="center">
          <Col>
            <p>No cars available.</p>
          </Col>
        </Row>
      )}

      {totalCars.length > 0 && !loading && (
        <Row justify="center" gutter={16}>
          {searchClicked
            ? (filteredCars.length > 0
                ? filteredCars.map((car) => (
                    <Col key={car._id} lg={5} sm={24} xs={24}>
                      <div className="car p-2 bs1">
                        <img src={car.image} className="carimg" />
                        <div className="car-content d-flex align-items-center justify-content-between">
                          <div className="text-left pl-2">
                            <p style={{fontSize: "18px"}}>{car.name}</p>
                            <p>Rent Per Hour {car.price} /-</p>
                          </div>
                          <div>
                            <button className="loginBtn">
                              <Link
                                to={`/booking/${car._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                Book Now
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))
                : (
                    <Col>
                      <p>No cars found matching the search criteria.</p>
                    </Col>
                  )
              )
            : currentCars
                .filter((o) => o.user !== user.otherInfo._id)
                .map((car) => (
                  <Col key={car._id} lg={5} sm={24} xs={24}>
                    <div className="car p-2 bs1">
                      <img src={car.image} className="carimg" />
                      <div className="car-content d-flex align-items-center justify-content-between">
                        <div className="text-left pl-2">
                          <p style={{fontSize: "18px"}}>{car.name}</p>
                          <p>Rent Per Hour {car.price} /-</p>
                        </div>
                        <div>
                          <button className="loginBtn">
                            <Link
                              to={`/booking/${car._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              Book Now
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
        </Row>
      )}

    <Pagination
        current={currentPage}
        total={searchClicked ? filteredCars.length : totalCars.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        style={{ marginTop: "40px", textAlign: "center" }}
      />

      {loading && <Spinner />}
      {totalNearestVehicles.length > 0 && !loading && (
        <div>
          <h5 style={{ fontWeight: "bold", marginLeft: "880px", marginTop: "60px", marginBottom: "20px"}}>
            Vehicles Near You
          </h5>
          <Row justify="center" gutter={16}>
            {totalNearestVehicles
              .filter((o) => o.user !== user.otherInfo._id)
              .map((car) => (
                <Col key={car._id} lg={5} sm={24} xs={24}>
                  <div className="car p-2 bs1">
                    <img src={car.image} className="carimg" />
                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div className="text-left pl-2" >
                        <p style={{fontSize: "18px"}}>{car.name}</p>
                        <p>Rent Per Hour {car.price} /-</p>
                      </div>
                      <div>
                        <button className="loginBtn">
                          <Link
                            to={`/booking/${car._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            Book Now
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Home;
