import React, { Suspense, lazy, useState } from "react";
import tw from "tailwind-styled-components";
import { Route, Routes } from "react-router-dom";
import Menu_Bar from "../component/Menu_Bar";
import Loading from "./Loading";
import Error from "./Error";
import PrivateRoute from "./context/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function Page() {
  const Login = lazy(() => import("./Login"));
  const Home = lazy(() => import("./Home"));
  const Mypage = lazy(() => import("./Mypage"));
  const Review = lazy(() => import("./Review"));
  const Gallery = lazy(() => import("./Gallery"));
  const Artwork = lazy(() => import("./Artwork"));
  const KaKaoMap = lazy(() => import("../modules/KaKaoMap"));
  // const PrivateRoute = lazy(() => import("./context/PrivateRoute"));

  const [mapMode, setMapMode] = useState(false);

  return (
    <BasicDiv>
      <Menu_Bar />
      <div className="pb-[100px]">
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/my-page/*" element={<Mypage />} /> */}

              {/* <Route
                path="/my-page"
                element={<PrivateRoute element={<Mypage />} />}
              /> */}

              <Route element={<PrivateRoute />}>
                <Route path="/my-page" element={<Mypage />} />
              </Route>
              <Route path="/review" element={<Review />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route
                path="/map"
                element={<KaKaoMap setMapMode={setMapMode} mapMode={mapMode} />}
              />
              <Route path="/artwork" element={<Artwork />} />
              {/* <Route path="/loading" element={<Loading />} /> */}
              <Route path="/*" element={<Error />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </div>
    </BasicDiv>
  );
}

export default Page;

const BasicDiv = tw.div`
w-mobileWidth h-full mx-auto
border-2 border-solid border-black

`;
