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

    navigate("/history");
  };

  return (
    <Page>
      <Header title="Diary" />
      <Box
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1729323375/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-10-19_lu%CC%81c_14.33.11_s95och.png')",
          backgroundSize: "cover",
          height: "700px",
          padding: "8px",
        }}
      >
        <Text
          style={{
            padding: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            paddingBottom: "35px",
          }}
        >
          Diary
        </Text>

        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            justifyItems: "center",
          }}
        >
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      </Box>
    </Page>
  );
};

export default CalendarComponent;
