import React, { useState } from "react";
import { Box, Spinner } from "zmp-ui";
import axios from "axios";
import { Typography } from "@mui/material";

// Define the response type
interface PredictionResponse {
  predicted_label: number;
  confidence: number;
}

// Define the valid labels object with valid image URLs
const validLabels: Record<
  number,
  { label: string; description: string; prevention: string; image: string }
> = {
  0: {
    label: "Age",
    description:
      "Age-related changes can affect vision. Regular eye exams can help detect age-related eye conditions early, allowing for timely treatment.",
    prevention:
      "Maintain a healthy lifestyle, including a balanced diet and regular exercise.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081568/age1_gcf32r.png",
  },
  1: {
    label: "Cataract",
    description:
      "Cataracts cloud the eye's lens, leading to blurry vision. Cataract surgery is the most effective treatment.",
    prevention:
      "Wear sunglasses to block UV rays, quit smoking, and manage conditions like diabetes.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081568/cataract1_rrul9k.png",
  },
  2: {
    label: "Diabetes",
    description:
      "Diabetic retinopathy is a complication of diabetes affecting the retina. Early detection can prevent vision loss.",
    prevention: "Control blood sugar levels, blood pressure, and cholesterol.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081567/diabetes1_zdbixw.jpg",
  },
  3: {
    label: "Glaucoma",
    description:
      "Glaucoma damages the optic nerve and can lead to blindness. Early detection through regular eye exams is crucial.",
    prevention:
      "Regular eye checkups, especially if you are at higher risk, and maintaining normal eye pressure.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081567/glaucoma1_mugl0z.png",
  },
  4: {
    label: "Hypertension",
    description:
      "High blood pressure can damage blood vessels in the retina, leading to hypertensive retinopathy.",
    prevention:
      "Manage blood pressure through a healthy diet, regular exercise, and medication if necessary.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081567/hypertension1_ia9z9c.jpg",
  },
  5: {
    label: "Myopia",
    description:
      "Myopia (nearsightedness) causes distant objects to appear blurry. It is typically corrected with glasses or contact lenses.",
    prevention:
      "Limit screen time, spend time outdoors, and have regular eye exams.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081567/myopia1_ehbtwh.png",
  },
  6: {
    label: "Normal",
    description:
      "No significant eye conditions detected. Regular eye exams are still recommended to maintain eye health.",
    prevention: "Maintain a healthy lifestyle and have periodic eye checkups.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081566/normal1_buw8tl.png",
  },
  7: {
    label: "Other",
    description:
      "Other eye conditions not specifically classified. Consult an eye care professional for a thorough examination.",
    prevention: "Seek professional advice for diagnosis and treatment options.",
    image:
      "https://res.cloudinary.com/dwljkfseh/image/upload/v1736081567/other1_wiwtfo.png",
  },
  8: {
    label: "Invalid Image",
    description:
      "The uploaded image is invalid or unclear. Please upload a valid image for analysis.",
    prevention: "Ensure the image is clear and properly uploaded.",
    image:
      "https://raw.githubusercontent.com/ducthinh17/DoctorCalculate2.0/main/public/image/diseases/invalid_image.png",
  },
};

const UploadFundus: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null); // Clear previous errors
      setResult(null); // Clear previous results
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post<PredictionResponse>(
        "https://0a0d-35-185-65-203.ngrok-free.app/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response Data:", response.data);
      setResult(response.data);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while uploading the image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="bg-background"
      style={{
        padding: "20px 5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div
        className="relative text-center py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg mb-5"
        style={{ width: "100%" }}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase">
          <span className="drop-shadow-lg">Upload Fundus</span>
        </h1>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-3/4 bg-white rounded-full opacity-30"></div>
      </div>

      {/* Image Preview */}
      <img
        src={
          selectedFile
            ? URL.createObjectURL(selectedFile)
            : "https://res.cloudinary.com/dwljkfseh/image/upload/v1736079792/upload_fatjkt.png"
        }
        alt="Upload Preview"
        onClick={() => document.getElementById("fileInput")?.click()}
        style={{
          width: "60%",
          objectFit: "cover",
          marginBottom: "20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          borderRadius: "12px",
          backgroundColor: loading ? "#cccccc" : "rgba(68, 141, 177, 90%)",
          padding: "12px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        disabled={loading}
      >
        {loading ? (
          <Spinner size="small" />
        ) : (
          <p style={{ fontWeight: "bold", fontSize: "16px", color: "#FFFFFF" }}>
            Predict Image
          </p>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "10px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      )}

      {/* Result Section */}
      {result && (
        <Box
          style={{
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            textAlign: "center",
            backgroundColor: "#fff",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: 600,
              color: "#3f51b5",
              marginBottom: "10px",
              textTransform: "uppercase",
            }}
          >
            {validLabels[result.predicted_label]?.label}
          </Typography>

          <Typography variant="body2" style={{ marginBottom: "8px" }}>
            {validLabels[result.predicted_label]?.description}
          </Typography>

          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Prevention: {validLabels[result.predicted_label]?.prevention}
          </Typography>
          <img
            src={validLabels[result.predicted_label]?.image}
            alt={validLabels[result.predicted_label]?.label}
            style={{
              width: "50%",
              display: "inline",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadFundus;
