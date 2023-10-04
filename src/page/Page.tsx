import React, { Suspense, lazy, useState } from "react";
import tw from "tailwind-styled-components";
import { Route, Routes } from "react-router-dom";
import MenuBar from "../component/MenuBar";
import Loading from "./exception/Loading";
import Error from "./exception/Error";
import KaKaoMap from "../modules/KaKaoMap";

function Page() {
  const Signup = lazy(() => import("./Login"));
  const Login = lazy(() => import("./Login"));
  const Home = lazy(() => import("./Home"));
  const Mypage = lazy(() => import("./Mypage"));
  const Review = lazy(() => import("./Review"));
  const NearBy = lazy(() => import("./NearBy"));
  const SearchPage = lazy(() => import("./SearchPage"));
  const KaKaoMap = lazy(() => import("../modules/KaKaoMap"));

  const [mapMode, setMapMode] = useState(false);

  return (
    <BasicDiv>
      <MenuBar />
      <>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/nearby" element={<NearBy />} />
            <Route
              path="/map"
              element={<KaKaoMap setMapMode={setMapMode} mapMode={mapMode} />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/loading" element={<Loading />} />

            {/* <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              /> */}
            <Route path="/*" element={<Error />} />
          </Routes>
        </Suspense>
      </>
    </BasicDiv>
  );
}

export default Page;

const BasicDiv = tw.div`
w-mobileWidth h-full mx-auto
border-2 border-solid border-black

`;
