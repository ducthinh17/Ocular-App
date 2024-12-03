import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "../pages/index";
import CategoryPage from "../pages/category";
import CartPage from "../pages/cart";
import NotificationPage from "../pages/notification";
import Guild from "../pages/Guild";

import CameraPage from "../pages/camera";
import Result_medical from "../pages/Result_medical";
import Treatments from "../pages/treatments";
import Suggestions from "../pages/Suggestions";
import Records from "../pages/Records";
import Statistics from "../pages/statistics";
import Calendar from "../pages/Calendar";
import Survey from "../pages/Survey";
import HistoryPage from "../pages/history";
import ProfilePage from "../pages/profile";
import AccountDetails from "../pages/AccountDetails";

import SearchPage from "../pages/search";
import CheckoutResultPage from "../pages/Result";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "../hooks";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/camera" element={<CameraPage />}></Route>
          <Route path="/Result_medical" element={<Result_medical />}></Route>
          <Route
            path="/suggestions"
            element={<Suggestions></Suggestions>}
          ></Route>
          <Route path="/Records" element={<Records />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/treatment" element={<Treatments />}></Route>
          <Route path="/Treatments" element={<Treatments />}></Route>
          <Route path="/Survey" element={<Survey />}></Route>
          <Route path="/account-details" element={<AccountDetails />} />
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/result" element={<CheckoutResultPage />}></Route>
          <Route path="/Calendar" element={<Calendar />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/guild" element={<Guild />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
