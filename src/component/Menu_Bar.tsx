import React, { useState } from "react";
import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

export default function Menu_Bar() {
  const [hoveredImage, setHoveredImage] = useState<string>("");
  const navigate = useNavigate();

  return (
    <MenubarContainer>
      <div className="w-10/12 mx-auto flex justify-between h-[35px] mt-4 mb-12">
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="home_menu"
          src={
            hoveredImage === "home" ? loadImg.Fill_Menu_Home : loadImg.Menu_Home
          }
          onMouseEnter={() => setHoveredImage("home")}
          // onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="image_menu"
          src={
            hoveredImage === "image"
              ? loadImg.Fill_Menu_Image
              : loadImg.Menu_Image
          }
          onMouseEnter={() => setHoveredImage("image")}
          // onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/artwork")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="gallery_menu"
          src={
            hoveredImage === "gallery"
              ? loadImg.Fill_Menu_Gallery
              : loadImg.Menu_Gallery
          }
          onMouseEnter={() => setHoveredImage("gallery")}
          // onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/gallery")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="bookmark_menu"
          src={
            hoveredImage === "bookmark"
              ? loadImg.Fill_Menu_Bookmark
              : loadImg.Menu_Bookmark
          }
          onMouseEnter={() => setHoveredImage("bookmark")}
          // onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/review")}
        />
        <img
          style={{ filter: "brightness(0) invert(1)" }}
          alt="user_menu"
          src={
            hoveredImage === "user" ? loadImg.Fill_Menu_User : loadImg.Menu_User
          }
          onMouseEnter={() => setHoveredImage("user")}
          // onMouseLeave={() => setHoveredImage("")}
          onClick={() => navigate("/mypage")}
        />
        {/* <Mypage_MenuIcon /> */}
      </div>
    </MenubarContainer>
  );
}

const MenubarContainer = tw.div`
bg-primary-YellowGreen w-mobileWidth fixed bottom-0
z-50
`;
