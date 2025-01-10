import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  NavLink,
  Outlet,
  Route,
  RouterProvider,
} from "react-router";
import RecoilBasic from "./RecoilBasic.tsx";
import { RecoilRoot } from "recoil";
import RecoilFamily from "./RecoilFamily.tsx";

const RootLayout = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink
            to="/recoil-basic"
            style={({ isActive }) => {
              if (isActive) {
                return { color: "red" };
              }

              return {};
            }}
          >
            리코일 기본
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recoil-family"
            style={({ isActive }) => {
              if (isActive) {
                return { color: "red" };
              }

              return {};
            }}
          >
            리코일 패밀리
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="recoil-basic" element={<RecoilBasic />} />
      <Route path="recoil-family" element={<RecoilFamily />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
