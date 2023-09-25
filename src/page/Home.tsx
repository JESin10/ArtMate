/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Footer from "../component/Footer";
import Carousel from "../modules/Carousel";
import { IconLoad } from "../assets/images";

export default function Home() {
  const example: string[] = [IconLoad.EX_image1, IconLoad.EX_image2];
  return (
    <div className="h-fit border-red-400 border-2">
      <div className="h-[900px] border-blue-400 border-2">
        <Carousel>
          {example &&
            example.map((image: string, index: number) => (
              <img key={index} src={image} alt={`image-${index}`} />
            ))}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
