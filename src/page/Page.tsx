import { Suspense, lazy, useState } from "react";
import tw from "tailwind-styled-components";
import { Route, Routes } from "react-router-dom";
import MenuBar from "../component/MenuBar";
import Loading from "./Loading";
import Error from "./Error";
import PrivateRoute from "./context/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import SearchResult from "./SearchResult";

function Page() {
  const Login = lazy(() => import("./Login"));
  const Signup = lazy(() => import("./Signup"));
  const Home = lazy(() => import("./Home"));
  const Mypage = lazy(() => import("./Mypage"));
  const Review = lazy(() => import("./Review"));
  const Gallery = lazy(() => import("./Gallery"));
  const Artwork = lazy(() => import("./Artwork"));
  const Saving = lazy(() => import("./Saving"));
  const Liked = lazy(() => import("./Liked"));

  const KaKaoMap = lazy(() => import("../modules/KaKaoMap"));
  const [mapMode, setMapMode] = useState(false);

  return (
    <BasicDiv>
      <MenuBar />
      <div className="pb-[100px]">
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/search" element={<SearchResult />} /> */}
              <Route path="/search/:keyword" element={<SearchResult />} />

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
              <Route element={<PrivateRoute />}>
                <Route path="/my-page/liked" element={<Liked />} />
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
border-2 border-dotted border-black

`;
