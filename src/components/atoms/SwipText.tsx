import React from "react";
import { timeDefine } from "./../../util/shared/timeDefine";

interface IFeatures {
  names: string[];
  feature: string;
  setFeature: (obj: any) => void;
  setTimer: (obj: any) => void;
}

function SwipText({ names, feature, setTimer, setFeature }: IFeatures) {
  return (
    <>
      {names?.map((obj: string) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: feature === obj ? "#70f3f8" : "transparent",
            color: feature === obj ? "#22264c" : "#737997",
            fontWeight: feature === obj ? "bold" : "none",
            padding: "8px 24px",
            margin: "8px 8px",
            borderRadius: "20px 20px 20px 20px",
          }}
          onClick={() => {
            setFeature(obj);
            setTimer(timeDefine(obj));
          }}
        >
          {obj}
        </div>
      ))}
    </>
  );
}

export default SwipText;
