import React, { useState } from "react";
import { IconLoad } from "../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [hoveredImage, setHoveredImage] = useState<string>("");
  const navigate = useNavigate();

  return (
    <MenubarContainer>
      <div className="w-10/12 mx-auto flex justify-between h-[35px] mt-4 mb-12">
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="home_menu"
          src={
            hoveredImage === "home"
              ? IconLoad.Fill_Menu_Home
              : IconLoad.Menu_Home
          }
          onMouseEnter={() => setHoveredImage("home")}
          onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="image_menu"
          src={
            hoveredImage === "image"
              ? IconLoad.Fill_Menu_Image
              : IconLoad.Menu_Image
          }
          onMouseEnter={() => setHoveredImage("image")}
          onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/search")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="gallery_menu"
          src={
            hoveredImage === "gallery"
              ? IconLoad.Fill_Menu_Gallery
              : IconLoad.Menu_Gallery
          }
          onMouseEnter={() => setHoveredImage("gallery")}
          onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/nearby")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="bookmark_menu"
          src={
            hoveredImage === "bookmark"
              ? IconLoad.Fill_Menu_Bookmark
              : IconLoad.Menu_Bookmark
          }
          onMouseEnter={() => setHoveredImage("bookmark")}
          onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/review")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="user_menu"
          src={
            hoveredImage === "user"
              ? IconLoad.Fill_Menu_User
              : IconLoad.Menu_User
          }
          onMouseEnter={() => setHoveredImage("user")}
          onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/mypage")}
        />
      </div>
    </MenubarContainer>
  );
}

const MenubarContainer = tw.div`
bg-primary-YellowGreen w-mobileWidth fixed bottom-0
z-20
`;
// shadow-[0px_0px_10px_5px] shadow-black
