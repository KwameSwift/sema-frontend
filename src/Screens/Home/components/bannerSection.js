import React from "react";
import Carousel from "react-bootstrap/Carousel";
import TestImg from "../../../Assets/images/test_bg.JPG";
import TestImgOne from "../../../Assets/images/test_bg_1.JPG";
import TestImgTwo from "../../../Assets/images/test_bg_2.JPG";
import {useTranslation} from "react-i18next";

function HomeBanners() {
    const {t} = useTranslation();

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
                        <p className="text-[1.2em]">
                            {t("home.bannerText1")}
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
                        <p className="text-[1.2em]">
                            {t("home.bannerText2")}
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
                        <p className="text-[1.2em]">
                            {t("home.bannerText3")}
                        </p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeBanners;
