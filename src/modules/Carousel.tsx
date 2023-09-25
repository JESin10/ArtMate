import React, { ReactNode } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tw from "tailwind-styled-components";
import Slider, { CustomArrowProps } from "react-slick";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

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
    arrows: true, // 이전/다음 화살표 표시 여부
    prevArrow: <PrevArrow />, // 이전 화살표 커스텀 컴포넌트
    nextArrow: <NextArrow />, // 다음 화살표 커스텀 컴포넌트
    responsive: [
      // 반응형 설정
      // {
      //   breakpoint: 768, // 화면 너비가 768px 이하일 때 적용
      //   settings: {
      //     slidesToShow: 2, // 한 번에 보여질 슬라이드 수
      //     slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
      //   },
      // },
      // {
      //   breakpoint: 480, // 화면 너비가 480px 이하일 때 적용
      //   settings: {
      //     slidesToShow: 1, // 한 번에 보여질 슬라이드 수
      //     slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
      //   },
      // },
    ],
  };

  return (
    <SliderWrapper>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </SliderWrapper>
  );
};

export default Carousel;

const SliderWrapper = tw.div`
w-full p-4

bg-black/50
`;

const StyledSlider = tw(Slider)`
mx-auto mb-5 
w-11/12 h-auto
items-center

border-primary-YellowGreen border-4 rounded-xl

`;
