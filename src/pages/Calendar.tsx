import React, { FC, useState } from "react";
import { Box, Header, Page, Text, useNavigate } from "zmp-ui";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export let selectedDateGlobal: Date | null = null;

const CalendarComponent: FC = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    selectedDateGlobal = newDate;

    navigate("/calendarDate");
  };

  return (
    <Page>
      <Header title="Calendar" />
      <Box
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1729323375/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-10-19_lu%CC%81c_14.33.11_s95och.png')",
          backgroundSize: "cover",
          height: "700px",
          padding: "8px",
        }}
      >
        <div className="relative text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-lg shadow-2xl mb-6">
          <h1 className="text-4xl font-extrabold text-white tracking-wide uppercase">
            <span className="drop-shadow-lg">Calendar</span>
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-40"></div>
        </div>

        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            display: "flex", // Sử dụng Flexbox
            justifyContent: "center", // Căn giữa theo chiều ngang
            alignItems: "center", // Căn giữa theo chiều dọc (nếu cần)
          }}
        >
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      </Box>
    </Page>
  );
};

export default CalendarComponent;
