import React from "react";
import Carousel from "react-bootstrap/Carousel";
import TestImg from "../../../Assets/images/test_bg.JPG";
import TestImgOne from "../../../Assets/images/test_bg_1.JPG";
import TestImgTwo from "../../../Assets/images/test_bg_2.JPG";

function HomeBanners() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <div className="carousel-item-overlay">
          <img
            className="d-block w-100 max-h-[900px]"
            src={TestImg}
            alt="First slide"
          />
          <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
            <p className="typing-animation">FIRST ITEM NAME</p>
            <p className="text-[1.2em]">
              Ongea na Demokrasia is a project under African Child Projects
              whereby seeks to sensitize citizens on the importance of democratic
              culture and digital democracy. Also to develop open digital civic
              spaces, including C2G (Citizen to Government) digital platform
              through the app called Sema Tanzania in order to facilitate the same
              and meaningful Youth Participation.
            </p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className="carousel-item-overlay">
          <img
            className="d-block w-100 max-h-[900px]"
            src={TestImgOne}
            alt="Second slide"
          />
          <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
            <p className="typing-animation">SECOND ITEM</p>
            <p className="text-[1.2em]">
              Sema Tanzania is a Civic technology open platform built to empower
              democratic participation through polling, ideation, collaboration
              and access to digital services . The platform aims to strengthen
              civic participation among citizens and government interaction in
              building stronger and inclusive digital democracies.
            </p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div className="carousel-item-overlay">
          <img
            className="d-block w-100 max-h-[900px]"
            src={TestImgTwo}
            alt="Third slide"
          />
          <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
            <p className="typing-animation">THIRD ITEM LABEL</p>
            <p className="text-[1.2em]">
              Our Partners to this project are Democracy Works Foundation, Charter
              Africa Project, European Union and African Child Projects.
            </p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanners;
