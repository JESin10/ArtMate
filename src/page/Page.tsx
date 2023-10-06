import React, { Suspense, lazy, useState } from "react";
import tw from "tailwind-styled-components";
import { Route, Routes } from "react-router-dom";
import Menu_Bar from "../component/Menu_Bar";
import Loading from "./exception/Loading";
import Error from "./exception/Error";

function Page() {
  const Signup = lazy(() => import("./Login"));
  const Login = lazy(() => import("./Login"));
  const Home = lazy(() => import("./Home"));
  const Mypage = lazy(() => import("./Mypage"));
  const Review = lazy(() => import("./Review"));
  const Gallery = lazy(() => import("./Gallery"));
  const Artwork = lazy(() => import("./Artwork"));
  const KaKaoMap = lazy(() => import("../modules/KaKaoMap"));

  const [mapMode, setMapMode] = useState(false);

  return (
    <BasicDiv>
      <Menu_Bar />
      <div className="pb-[80px]">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/gallery" element={<Gallery />} />

            <Route
              path="/map"
              element={<KaKaoMap setMapMode={setMapMode} mapMode={mapMode} />}
            />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/loading" element={<Loading />} />

            {/* <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              /> */}
            <Route path="/*" element={<Error />} />
          </Routes>
        </Suspense>
      </div>
    </BasicDiv>
  );
}

export default Page;

const BasicDiv = tw.div`
w-mobileWidth h-full mx-auto
border-2 border-solid border-black

`;