import React from "react";
import { Container } from "react-bootstrap";
import SwipText from "./../atoms/SwipText";

enum NameModeEnum {
  LONGTIME,
  SHORTTIME,
  NORMAL,
}

interface IModeSelected {
  mode?: NameModeEnum;
  setObjectPomodoro: ({}: any) => void;
  objectPomodoro?: any;
  feature?: any;
  featuresFixed?: any;
  setFeature: (obj: any) => void;
  setTimer: (obj: any) => void;
}

function SwipTabView({
  feature,
  featuresFixed,
  setFeature,
  setTimer,
}: IModeSelected) {
  return (
    <Container
      style={{
        width: "30%",
        display: "flex",
        backgroundColor: "#181b39",
        padding: 0,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "3rem 3rem 3rem 3rem",
      }}
    >
      <SwipText
        names={featuresFixed}
        feature={feature}
        setTimer={setTimer}
        setFeature={setFeature}
      />
    </Container>
  );
}

export default SwipTabView;
