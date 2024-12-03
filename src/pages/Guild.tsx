import React, { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import StepGuide from "./stepGuide";
import { Divider } from "../components/divider";

const Guild: FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
  };

  const lineStyle: React.CSSProperties = {
    flexGrow: 1,
    height: "1px",
    backgroundColor: "black",
  };

  const titleStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
    padding: "0 10px",
    fontSize: "1.5rem",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    textAlign: "center",
  };

  const steps = [
    {
      stepNumber: "1",
      title: "Take a selfie",
      description:
        "Let’s smile confidently! Make sure your full face is in the camera's view.",
      imageUrl:
        "https://res.cloudinary.com/dwljkfseh/image/upload/v1730726946/462565387_468666096227004_4830643068285312997_n_mkipuw.png",
    },
    {
      stepNumber: "2",
      title: "Facial Area Selection",
      description:
        "We will analyze your facial skin area and display it for review. Please ensure this is the region where you'd like the acne diagnostic process to be conducted.",
      imageUrl:
        "https://res.cloudinary.com/dwljkfseh/image/upload/v1730742920/af_b4eazo.png",
    },
    {
      stepNumber: "3",
      title: "Acne Treatment Solutions",
      description:
        "Our specialized intensive treatment targets each acne-causing factor, providing comprehensive information to help you maintain complete skin health.",
      imageUrl:
        "https://res.cloudinary.com/dwljkfseh/image/upload/v1730742462/cbecb0e7484d6bd604487c5bd504e3db_hjqi4q.jpg",
    },
    {
      stepNumber: "4",
      title: "Expert Care for Acne",
      description:
        "Dermatology specialists and acne treatment experts will deliver personalized, advanced treatment sessions tailored to individual skin needs, addressing specific issues like acne, scarring, and skin texture for optimal results.",
      imageUrl:
        "https://res.cloudinary.com/dwljkfseh/image/upload/v1730804496/dotor_qcvkn1.png",
    },
  ];

  return (
    <Page style={{ backgroundColor: "white" }}>
      <Header title="Guild" showBackIcon={true} />
      <div
        style={{
          fontFamily: "'Roboto', sans-serif",
          backgroundImage:
            "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1730744659/64dfe438c6e2a531bdc4c712c613ad10_1_qczvft.jpg')",
          backgroundSize: "cover",
        }}
      >
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
            User Guide
          </Text>
        </div>

        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div style={containerStyle}>
              <div style={lineStyle}></div>
              <h2 style={titleStyle}>{`Step ${step.stepNumber}`}</h2>
              <div style={lineStyle}></div>
            </div>
            <StepGuide
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
            />
          </React.Fragment>
        ))}
        <Divider />
      </div>
    </Page>
  );
};

export default Guild;
