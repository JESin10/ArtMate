// import React, { useState } from "react";
// import { loadImg } from "../assets/images";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MenuHome } from "../assets/customSvg/Menubar_home.svg";
import { ReactComponent as MenuArtwork } from "../assets/customSvg/Menubar_image.svg";
import { ReactComponent as MenuGallery } from "../assets/customSvg/Menubar_gallery.svg";
import { ReactComponent as MenuReview } from "../assets/customSvg/Menubar_bookmark.svg";
import { ReactComponent as MenuUser } from "../assets/customSvg/Menubar_user.svg";
import { useAuth } from "../page/context/AuthContext";

export default function MenuBar() {
  // const [hoveredImage, setHoveredImage] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Menubar>
      <MenubarContainer>
        <GalleryMenuIcon onClick={() => navigate("/gallery")} />
        <ArtworkMenuIcon onClick={() => navigate("/artwork")} />
        <HomeMenuIcon onClick={() => navigate("/")} />
        <ReviewMenuIcon onClick={() => navigate("/review")} />
        <UserMenuIcon onClick={() => navigate("/my-page")} />
      </MenubarContainer>
    </Menubar>
  );
}

const Menubar = tw.div`
bg-primary-YellowGreen w-mobileWidth fixed bottom-0 z-50 
`;

const MenubarContainer = tw.div`
w-10/12 mx-auto flex justify-between item-center h-[35px] mt-4 mb-12
`;

const HomeMenuIcon = tw(MenuHome)`
fill-none w-10 h-10
hover:fill-white
active:fill-white
cursor-pointer
`;

const ArtworkMenuIcon = tw(MenuArtwork)`
fill-none w-10 h-10
hover:fill-white hover:stroke-none
active:fill-white
cursor-pointer
`;

const GalleryMenuIcon = tw(MenuGallery)`
fill-none w-10 h-10
hover:fill-white
active:fill-white
cursor-pointer
`;

const ReviewMenuIcon = tw(MenuReview)`
fill-none w-10 h-10
hover:fill-white  hover:stroke-none
active:fill-white
cursor-pointer
`;

const UserMenuIcon = tw(MenuUser)`
fill-none w-10 h-10
hover:fill-white
active:fill-white
cursor-pointer
`;
