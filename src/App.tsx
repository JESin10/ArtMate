import React, { Suspense } from "react";
import "./App.css";
import tw from "tailwind-styled-components";
import Home from "./page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./page/exception/Error";
import Login from "./page/Login";
import Mypage from "./page/Mypage";
import Review from "./page/Review";
import NearBy from "./page/NearBy";
import SearchPage from "./page/SearchPage";
import Loading from "./page/exception/Loading";

function App() {
  // const Signup = lazy(() => import("./page/Signup"));
  // const Login = lazy(() => import("./page/Login"));
  // const Dashboard = lazy(() => import("./page/Dashboard"));
  // const Explore = lazy(() => import("./page/Explore"));
  // const PrivateRoute = lazy(() => import("./context/PrivateRoute"));
  // const Navbar = lazy(() => import("./components/Navbar"));

  return (
    <BasicDiv>
      <React.Fragment>
        <BrowserRouter>
          {/* <Suspense fallback={<Loading />}> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/nearby" element={<NearBy />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/loading" element={<Loading />} />

            {/* <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              /> */}
            <Route path="/notfound" element={<Error />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          {/* </Suspense> */}
        </BrowserRouter>
      </React.Fragment>
    </BasicDiv>
  );
}

export default App;

const BasicDiv = tw.div`
w-mobileWidth h-screen mx-auto
border-2 border-solid border-black
`;
