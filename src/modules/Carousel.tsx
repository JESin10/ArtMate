import React, { ReactNode } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tw from "tailwind-styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import styled from "styled-components";

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <div {...props}>
    <FaAngleRight className="NextArrow" size="30px" color="black" />
  </div>
);

const PrevArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <div {...props}>
    <FaAngleLeft
      className="PrevArrow"
      size="30px"
      color="black"
      style={{ marginRight: "10px" }}
    />
  </div>
);

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const settings = {
    dots: true, // 도트 인디케이터 표시 여부
    infinite: true, // 무한 슬라이드 여부
    speed: 800, // 슬라이드 전환 속도 (ms)
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
    autoplay: true, // 자동 재생 여부
    autoplaySpeed: 5000, // 자동 재생 속도 (ms)
    pauseOnHover: true, // 마우스 호버 시 재생 일시 정지 여부
    arrows: false, // 이전/다음 화살표 표시 여부
    prevArrow: <PrevArrow />, // 이전 화살표 커스텀 컴포넌트
    nextArrow: <NextArrow />, // 다음 화살표 커스텀 컴포넌트
    responsive: [],
    draggable: true,
    dotsClass: "dots_custom",

    appendDots: (dots: any) => (
      <CustomDots className="dots_custom">{dots}</CustomDots>
    ),
  };

  return (
    // <SliderWrapper>
    <StyledSlider {...settings}>
      {/* <div className=" border-primary-YellowGreen border-4 rounded-xl"> */}
      {children}
      {/* </div> */}
    </StyledSlider>
    // </SliderWrapper>
  );
};

export default Carousel;

const SliderWrapper = tw.div`
w-full p-4 h-[500px]

bg-red-200
`;

const StyledSlider = tw(Slider)`
mx-auto mb-5 h-full
items-center object-cover object-center



`;

const CustomDotsContainer = tw.div`
w-fit bg-black my-2
`;

const CustomDots = styled.ul`
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between; // 요소 사이의 간격 조절
  align-items: center; // 수직 가운데 정렬

  li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: auto;
    padding: 0;
    width: 100%;
    margin: 10px 0;
  }

  button {
    border: solid;
    background-color: #d9d9d9;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    padding: 0;
    font-weight: bolder;
    margin: 0 5px;
  }

  .slick-active button {
    background-color: #608d00;
  }
`;
