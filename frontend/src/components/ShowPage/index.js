import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import HomeIcon from "../HomePageIcon";
import TempImage from "../../assets/tempimage.png";

import "./ShowPage.css";

const ShowPage = () => {
  const { businessId } = useParams();
  const [showData, setShowData] = useState({});
  const [showReview, setShowReview] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/businesses/${businessId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowData(data);
      });
  }, [businessId]);

  useEffect(() => {
    fetch(`/api/reviews/${businessId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowReview(data);
      });
  }, [businessId]);

  function reviewStar(input) {
    switch (input) {
      case 1:
        return "-9.4%";
      case 1.5:
        return "-4.7%";
      case 2:
        return "-18.8%";
      case 2.5:
        return "-14.1%";
      case 3:
        return "-28.3%";
      case 3.5:
        return "-23.6%";
      case 4:
        return "-37.6%";
      case 4.5:
        return "-32.9%";
      case 5:
      default:
        return "0%";
    }
  }

  function priceRange(input) {
    let result = "";
    for (let i = 0; i < input; i++) {
      result += "$";
    }
    return result;
  }

  function timeTillClose(input, date, close = "") {
    const [startTime, endTime] = showData.hours[date]
      ? input.hours[date].split("-")
      : ["10", "12"];

    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);

    const startTime24 =
      startHour > 12 ? `${startHour - 12}:00 PM` : `${startHour}:00 AM`;
    const endTime24 =
      endHour > 12 ? `${endHour - 12}:00 PM` : `${endHour}:00 AM`;
    if (close === "") {
      return endTime24;
    }
    return startTime24;
  }
  function handleImageError(event) {
    event.target.src = TempImage;
  }

  const center = showData.latitude
    ? `${showData.latitude.toString()},${showData.longitude.toString()}`
    : "";
  const mapUrl = center
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=18&size=400x200&markers=color:red%7C${center}&key=AIzaSyCpVTq-kHDX_XHZWQpfaHQ4dQmHNDu7ptU`
    : "";

  const handleReviewClick = () => {
    window.location.href = `/reviews/${showData.id}`;
  };

  return (
    <>
      <div className="show-page-container">
        <img
          class="show-image"
          src={`https://meal-mate-seeds.s3.amazonaws.com/testfolder/${showData.business_id}_photos/1.jpg`}
          onError={handleImageError}
          alt="img"
        ></img>
        <img
          className="show-image"
          src={`https://meal-mate-seeds.s3.amazonaws.com/testfolder/${showData.business_id}_photos/1.jpg`}
          onError={handleImageError}
          alt="img"
        ></img>
        <img
          className="show-image"
          src={`https://meal-mate-seeds.s3.amazonaws.com/testfolder/${showData.business_id}_photos/1.jpg`}
          onError={handleImageError}
          alt="img"
        ></img>
      </div>
      <div className="dark-image-header"></div>
      <Navigation />
      <div className="business-background-color"></div>
      <HomeIcon />
      <div className="show-page-header">
        <h1 className="show-page-name">{showData.name}</h1>
        <div className="show-review-container">
          <img
            className="business-review"
            style={{
              translate: `0% ${reviewStar(showData.stars)}`,
            }}
            src="https://s3-media0.fl.yelpcdn.com/assets/public/stars_v2.yji-59bbc2cf8e3d4be04fcc.png"
            alt=""
          ></img>
        </div>
        <div className="show-description">
          <i
            className="fa-solid fa-circle-check"
            style={{ color: "rgba(88,180,255,1)" }}
          ></i>{" "}
          <span style={{ color: "rgba(88,180,255,1)" }}>Claimed</span> &#x2022;{" "}
          {showData.properties &&
            priceRange(showData.properties.RestaurantsPriceRange2)}{" "}
          &#x2022; {showData.categories}{" "}
          <div className="show-open-text-container">
            <span className="show-open-text">Open </span>
            {showData.hours && timeTillClose(showData, "Friday")
              ? timeTillClose(showData, "Friday", "open")
              : "10:00 AM"}
            {" - "}
            {showData.hours && timeTillClose(showData, "Friday")
              ? timeTillClose(showData, "Friday")
              : "12:00 AM"}
          </div>
        </div>
        <div className="review-button-container">
          <button className="show-button-review" onClick={handleReviewClick}>
            Write a review
          </button>
          <h1 className="location-and-hours-title">Location & Hours</h1>
        </div>
      </div>

      <div className="show-image-container"></div>
      <div className="show-body-container">
        <div className="show-googlemaps">
          <img src={mapUrl} alt=""></img>
        </div>
        <div className="google-map-address">
          <span className="directions-style">{showData.address}</span>
          <br></br>
          {showData.city} {showData.state} {showData.postal_code}
        </div>
        <div className="show-hours">
          <div className="date-abbrev">
            <ul>
              <li>Mon</li>
              <li>Tues</li>
              <li>Wed</li>
              <li>Thurs</li>
              <li>Fri</li>
              <li>Sat</li>
              <li>Sun</li>
            </ul>
          </div>
          <ul>
            <li>
              {showData.hours && timeTillClose(showData, "Monday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Monday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Tuesday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Tuesday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Wednesday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Wednesday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Thursday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Thursday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Friday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Friday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Saturday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Saturday")}
            </li>
            <li>
              {showData.hours && timeTillClose(showData, "Sunday", "open")}{" "}
              {"-"} {showData.hours && timeTillClose(showData, "Sunday")}
            </li>
          </ul>
        </div>
        <div className="properties-info-container">
          <div className="amenities">
            <ul className="amenities-list">
              <h2>Amenities and more</h2>

              <li>
                {showData.properties &&
                showData.properties.RestaurantsTakeOut === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                TakeOut{" "}
              </li>
              <li>
                {showData.properties &&
                showData.properties.BusinessAcceptsCreditCards === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Accepts Credit Cards
              </li>
              <li>
                {showData.properties &&
                showData.properties.RestaurantsReservations === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Reservations
              </li>
              <li>
                {showData.properties &&
                showData.properties.RestaurantsTableService === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                TableService
              </li>
              <li>
                {showData.properties &&
                showData.properties.GoodForKids === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Good For Kids
              </li>
              <li>
                {showData.properties &&
                showData.properties.WheelchairAccessible === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Wheelchair Accessible
              </li>
              <li>
                {showData.properties &&
                showData.properties.OutdoorSeating === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Outdoor Seating
              </li>
              <li>
                {showData.properties &&
                showData.properties.RestaurantsDelivery === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Delivery
              </li>
            </ul>
          </div>
          <div className="amenities2-container">
            <ul className="amenities-list2">
              <li>
                {showData.properties && showData.properties.HasTV === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                HasTV
              </li>
              <li>
                {showData.properties &&
                showData.properties.DogsAllowed === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Dogs Allowed
              </li>
              <li>
                {showData.properties && showData.properties.Caters === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Caters
              </li>
              <li>
                {showData.properties &&
                showData.properties.RestaurantsGoodForGroups === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Good For Groups
              </li>
              <li>
                {showData.properties && showData.properties.HappyHour === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Happy Hour
              </li>
              <li>
                {showData.properties &&
                showData.properties.BikeParking === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Bike Parking
              </li>
              <li>
                {showData.properties &&
                showData.properties.BusinessAcceptsBitcoin === "True"
                  ? "\u2713"
                  : "\u2715"}{" "}
                Accepts Bitcoin
              </li>
              <li>
                {showData.properties &&
                showData.properties.WiFi &&
                showData.properties.WiFi.includes("no")
                  ? "\u2715"
                  : "\u2713"}{" "}
                Wifi{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="direction-container">
          <h2 className="directions-style" style={{ marginLeft: "20px" }}>
            Get Directions
          </h2>
          <div className="direction-address">{showData.address}</div>
        </div>
      </div>
      <div className="reviews-form-container">
        {/* HI{showReview && showReview[showData.id].content} */}
        {showReview && showReview.content}
      </div>
    </>
  );
};

export default ShowPage;
