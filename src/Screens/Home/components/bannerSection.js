import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import TestImg from "../../../Assets/images/test_bg.JPG";
import TestImgOne from "../../../Assets/images/test_bg_1.JPG";
import TestImgTwo from "../../../Assets/images/test_bg_2.JPG";

function HomeBanners() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 max-h-[900px]"
          src={TestImg}
          alt="First slide"
        />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <p className='typing-animation'>FIRST ITEM NAME</p>
          <p className='text-[1.2em]'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 max-h-[900px]"
          src={TestImgOne}
          alt="Second slide"
        />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <p className='typing-animation'>SECOND ITEM</p>
          <p className='text-[1.2em]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 max-h-[900px]"
          src={TestImgTwo}
          alt="Third slide"
        />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <p className='typing-animation'>THIRD ITEM LABEL</p>
          <p className='text-[1.2em]'>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanners;