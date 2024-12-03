import React, { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "../components/divider";
import { BottomNavigation, Icon } from "zmp-ui";
const CameraContent: FC = () => {
  const tryFeature = () => {
    console.log("Trying out the feature...");
  };

  return (
    <Box
      className="bg-background"
      style={{
        paddingTop: "150px",
        paddingBottom: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage:
          "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1729323375/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-10-19_lu%CC%81c_14.33.11_s95och.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={tryFeature}
        style={{
          marginBottom: "70px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "333px",
          borderRadius: "12px",
          backgroundColor: "rgba(217, 252, 251,90%)",
          padding: "10px",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1724481096/camera_dbfzbo.png"
          alt="Take a new picture"
          style={{
            width: "66px",
            height: "66px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <p>Take a new picture</p>
        <Icon icon="zi-chevron-right" />
      </button>
      <button
        onClick={tryFeature}
        style={{
          marginBottom: "70px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "333px",
          borderRadius: "12px",
          backgroundColor: "rgba(217, 252, 251,90%)",
          padding: "10px",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1724481096/upload_enbvxf.png"
          alt="Test image"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        Test Image for Diagnosis
        <Icon icon="zi-chevron-right" />
      </button>
      <button
        onClick={tryFeature}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "333px",
          borderRadius: "12px",
          backgroundColor: "rgba(217, 252, 251,90%)",
          padding: "10px",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1724481096/upload_enbvxf.png"
          alt="Guide"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        Guide to User Diagnosis
        <Icon icon="zi-chevron-right" />
      </button>
    </Box>
  );
};

const CameraPage2: FC = () => {
  return (
    <Page>
      <Header title="Camera" showBackIcon={false} />
      <Divider />
      <CameraContent />
    </Page>
  );
};

export default CameraPage2;
