import React from "react";
import { FC } from "react";
import { Box, Input, useNavigate, Icon } from "zmp-ui";

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} className="bg-white flex items-center justify-between">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Exploring Innovations with AIoT Lab VN..."
        className="flex-grow"
      />
      <button
        onClick={() => navigate("/notification")}
        className="notification-button ml-4 flex items-center justify-center"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "15%",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Icon icon="zi-notif-ring" />
      </button>
      <button
        onClick={() => navigate("/category")}
        className="notification-button ml-4 flex items-center justify-center"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "15%",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Icon icon="zi-grid-solid" />
      </button>
    </Box>
  );
};
