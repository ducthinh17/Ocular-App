import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "../pages/index";
import CategoryPage from "../pages/category";
import CartPage from "../pages/cart";
import NotificationPage from "../pages/notification";
import CameraPage from "../pages/camera";
import Result_medical from "../pages/Result_medical";
import Treatments from "../pages/treatments";
import Suggestions from "../pages/Suggestions";
import Statistics from "../pages/statistics";
import Calendar from "../pages/Calendar";
import HistoryPage from "../pages/history";
import CalendarDate from "../pages/calendar_date";
import NewsFrame from "../pages/index/NewsFrame";
import Guild from "../pages/Guild";
import SurveyPage from "../pages/Survey";

import ProfilePage from "../pages/AccountDetails";
import SearchPage from "../pages/search";
import CheckoutResultPage from "../pages/result";
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
const defaultNewsProps = {
  source: {
    id: null,
    name: "Default Source",
  },
  author: "Default Author",
  title: "Default Title",
  description: "Default description",
  url: "https://example.com",
  urlToImage: "https://via.placeholder.com/500",
  publishedAt: "2024-11-19T10:04:43Z",
  content: "This is the default content of the article.",
};

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/index" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/camera" element={<CameraPage />}></Route>
          <Route path="/Result_medical" element={<Result_medical />}></Route>
          <Route
            path="/suggestions"
            element={<Suggestions></Suggestions>}
          ></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/treatments" element={<Treatments />}></Route>
          <Route path="/Survey" element={<SurveyPage />}></Route>
          <Route
            path="/NewsFrame"
            element={<NewsFrame {...defaultNewsProps} />}
          />
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/result" element={<CheckoutResultPage />}></Route>
          <Route path="/Calendar" element={<Calendar />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/calendarDate" element={<CalendarDate />}></Route>

          <Route path="/guild" element={<Guild />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
