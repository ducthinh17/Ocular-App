import React, { useState, useEffect } from "react";
import { Box, Button, Header, Page, Text, Spinner, Icon } from "zmp-ui";
import { chooseImage } from "zmp-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faImage,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// The content of the homepage, including the buttons for interaction.
const CameraContent = () => {
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDefaultImage();
  }, []);

  useEffect(() => {
    if (shouldUpload) {
      handleUpload();
      setShouldUpload(false);
    }
  }, [imageUri, shouldUpload]);

  const loadDefaultImage = async () => {
    try {
      const imageUrl =
        "https://raw.githubusercontent.com/JavaKhangNguyen/Acnes-Detection/main/test/test2.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setFile(objectURL);
      setImageUri(objectURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const res = await chooseImage({
        sourceType: ["album", "camera"],
        count: 1,
      });
      const [selectedFile] = res.filePaths;
      setFile(selectedFile);
      const blob = await (await fetch(selectedFile)).blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUri(objectURL);
      setShouldUpload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);

      const blob = await (await fetch(imageUri)).blob();
      const formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post(
        "https://acne10.aiotlab.io.vn/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setShouldUpload(false);
      navigate("/result_medical", { state: { result: response.data } });
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      setShouldUpload(false);
    }
  };

  const tryFeature = () => {
    navigate("/guild");
  };
  return (
    <Box
      className="bg-background"
      style={{
        paddingTop: "30px",
        paddingBottom: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* New Image and Subtitle */}
      <img
        src="https://res.cloudinary.com/dwljkfseh/image/upload/v1732031650/mirrorr_ncvj7k.png"
        alt="Centered Image"
        style={{
          width: "60%",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <div
        style={{
          backgroundColor: "#F5DEB3", // màu vàng nâu nhạt
          padding: "3%",
          borderRadius: "8px",
          display: "inherit",
          width: "95%",
        }}
      >
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#2E2E2E",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Take a picture of how you look today!
        </p>
      </div>
      <br />
      <br />

      {/* Take a New Picture Button */}
      <button
        onClick={handleChooseImage}
        style={{
          marginBottom: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68 ,141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650194/5071156_ww7gou.png"
          alt="Take a new picture"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
            fontWeight: "bold",
          }}
        />

        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Take a new picture
        </p>
        <Icon icon="zi-chevron-right" />
      </button>

      {/* Test Image for Diagnosis Button */}
      <button
        onClick={() => setShouldUpload(true)}
        style={{
          marginBottom: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68 ,141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730650408/3476744_s9apiv.png"
          alt="Test image"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Test Image for Diagnosis
        </p>
        <Icon icon="zi-chevron-right" />
      </button>

      {/* Guide to User Diagnosis Button */}
      <button
        onClick={tryFeature}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          borderRadius: "12px",
          backgroundColor: "rgba(68, 141, 177, 90%)",
          padding: "10px",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <img
          src="https://res.cloudinary.com/dwljkfseh/image/upload/v1730651555/4961736_zca8t0.png"
          alt="Guide"
          style={{
            width: "66px",
            height: "66px",
            objectFit: "cover",
          }}
        />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Guide to User Diagnosis
        </p>
        <Icon icon="zi-chevron-right" />
      </button>
    </Box>
  );
};

const HomePage: React.FunctionComponent = () => {
  return (
    <Page>
      <Header title="Camera" showBackIcon={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1730746393/b96c5fb7277897daa937b840a4aaa45d_ti2q1p.jpg')",
          backgroundSize: "100% 190%",
          padding: "3%",
        }}
      >
        <Text
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
            width: "65%",
            padding: "4%",
            borderRadius: "50px",
          }}
        >
          Camera
        </Text>
      </div>

      <CameraContent />
    </Page>
  );
};

export default HomePage;
