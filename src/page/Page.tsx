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
  const Signup = lazy(() => import("./Signup"));

  const Home = lazy(() => import("./Home"));
  const Mypage = lazy(() => import("./Mypage"));
  const Review = lazy(() => import("./Review"));
  const Gallery = lazy(() => import("./Gallery"));
  const Artwork = lazy(() => import("./Artwork"));
  const Saving = lazy(() => import("./Saving"));
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
              <Route path="/gallery" element={<Gallery />} />
              <Route
                path="/map"
                element={<KaKaoMap setMapMode={setMapMode} mapMode={mapMode} />}
              />
              <Route path="/artwork" element={<Artwork />} />
              <Route path="/review" element={<Review />} />
              <Route element={<PrivateRoute />}>
                <Route path="/my-page" element={<Mypage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/my-page/saving" element={<Saving />} />
              </Route>

              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />

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
