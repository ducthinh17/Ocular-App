import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, Button, Page, Text, Header, Icon, Spinner } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { chooseImage } from "zmp-sdk";
import axios from "axios";
import logo from "../static/logo.png";

// Define the BoundingBox interface
interface BoundingBox {
  class_id: string;
  cords: number[];
  percentage_conf: string;
}

// Utility functions
export const decodeBase64 = (base64String: string) =>
  `data:image/jpeg;base64,${base64String}`;

let exportedImage: string = "";
export const getExportedImage = () => exportedImage;

let globalBoundingBoxes: BoundingBox[] = [];
export const getBoundingBoxes = () =>
  globalBoundingBoxes.map((box) => ({ ...box }));

export const handleUpload = async (
  imageUri: string,
  setBoundingBoxes: React.Dispatch<React.SetStateAction<BoundingBox[]>>,
  setOutputImage: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldUpload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setBoundingBoxes([]);
    setOutputImage("");
    setMessage("");
    setLoading(true);

    const blob = await (await fetch(imageUri)).blob();
    const formData = new FormData();
    formData.append("image", blob);

    const response = await axios.post(
      "https://acne10.aiotlab.io.vn/upload_image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const { bounding_boxes, output_image, message = "" } = response.data;
    setBoundingBoxes(bounding_boxes);
    setOutputImage(output_image);
    exportedImage = output_image;
    setMessage(message || "");
  } catch (error) {
    console.error("Error uploading image:", error);
    setMessage("Failed to upload image. Please try again.");
  } finally {
    setLoading(false);
    setShouldUpload(false);
  }
};

const ResultMedical: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = location.state || { result: null };

  const [imageUri, setImageUri] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([]);
  const [outputImage, setOutputImage] = useState<string>("");
  const [shouldUpload, setShouldUpload] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (result) {
      const { bounding_boxes, output_image, message } = result;
      setBoundingBoxes(bounding_boxes);
      setOutputImage(output_image);
      setMessage(message || "");
    }
  }, [result]);

  useEffect(() => {
    if (shouldUpload) {
      handleUpload(
        imageUri,
        setBoundingBoxes,
        setOutputImage,
        setMessage,
        setLoading,
        setShouldUpload
      );
    }
  }, [imageUri, shouldUpload]);

  useEffect(() => {
    exportedImage = outputImage;
    globalBoundingBoxes = boundingBoxes;
  }, [outputImage, boundingBoxes]);

  if (!result) return null;

  const img = decodeBase64(outputImage);

  const handleChooseImage = async () => {
    try {
      const res = await chooseImage({ sourceType: ["album"], count: 1 });
      const [selectedFile] = res.filePaths;
      setFile(selectedFile);
      const blob = await (await fetch(selectedFile)).blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUri(objectURL);
      setShouldUpload(true);
    } catch (error) {
      console.error("Error choosing image:", error);
    }
  };

  const takeSuggestions = () => {
    const classes = new Set(boundingBoxes.map((box) => box.class_id));
    navigate("/Suggestions", { state: Array.from(classes) });
  };

  const displayInformation = () => {
    if (boundingBoxes.length === 0 && message) {
      return (
        <div className="info-container flex justify-center items-center h-screen">
          <Text className="information-text text-center font-medium">
            {message}
          </Text>
        </div>
      );
    }

    return (
      <List>
        {boundingBoxes.map((box, index) => (
          <List.Item
            className="!mt-[15px] bg-amber-100 p-4 rounded-lg shadow-md"
            key={index}
          >
            <div>
              <Text className="information-text  mb-[4px] text-gray-700">
                Type:{" "}
                <span className="font-bold text-blue-600">{box.class_id}</span>
              </Text>
              <Text className="information-text mb-[4px] text-gray-700">
                Confidence:{" "}
                <span className="font-bold text-orange-600">
                  {box.percentage_conf}%
                </span>
              </Text>
            </div>
          </List.Item>
        ))}
      </List>
    );
  };

  return (
    <Page>
      <Header
        title={
          (
            <Text.Title size="large" className="text-white !font-medium">
              Result
            </Text.Title>
          ) as unknown as string
        }
        showBackIcon={true}
        backIcon={<Icon icon="zi-arrow-left" className="text-white" />}
        backgroundColor="#FF5F8F"
      />
      <div className="info-container p-4">
        {img && (
          <img
            className="outputImage w-full mb-[5px] rounded-md shadow-lg"
            src={img}
            alt="Processed Output"
          />
        )}
        <Text className="mb-[5px] mt-[20px] text-lg font-bold underline">
          &#10020; Acne Identification List:
        </Text>
        {displayInformation()}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Spinner visible logo={logo} />
          </div>
        )}
        <div className="button-container flex justify-center mt-4 space-x-4">
          <Button
            className="flex-1 shadow-lg transition-transform transform hover:scale-105 hover:bg-primary-dark"
            variant="primary"
            size="large"
            onClick={handleChooseImage}
            style={{
              borderRadius: "8px",
              padding: "10px 0",
            }}
          >
            <Text size="large" className="font-semibold text-white">
              <FontAwesomeIcon
                bounce
                size="lg"
                icon={faArrowUpFromBracket}
                style={{ marginRight: "10px" }}
              />
              Upload new
            </Text>
          </Button>

          <Button
            className="flex-1 shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
            variant="primary"
            size="large"
            onClick={takeSuggestions}
            style={{
              borderRadius: "8px",
              padding: "10px 0",
              backgroundColor: "#ffc800",
            }}
          >
            <Text size="large" className="font-semibold text-white">
              <FontAwesomeIcon
                icon={faLightbulb}
                size="lg"
                fade
                style={{ color: "#fff", marginRight: "5px" }}
              />
              Take suggestions
            </Text>
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default ResultMedical;
