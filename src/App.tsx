import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

import useSound from "use-sound";
import { MdSettings } from "react-icons/md";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import SwipTabView from "./components/organisms/SwipTabView";
import { dispSecondsAsMins } from "./util/shared/transformText";
import { timeDefine } from "./util/shared/timeDefine";
import { NameModeEnum } from "./util/enums/NameModeEnum";
import { IObjectPomodoro } from "./util/interfaces/IObjectPomodoro";

const beep = require("./assets/fim.mp3");
// TODO add react-advertising
const App = () => {
  const [objectPomodoro, setObjectPomodoro] = useState<IObjectPomodoro>({
    twentyFiveTime: 0,
    fiveTime: 0,
    mode: NameModeEnum.NORMAL,
  });

  const [play] = useSound(beep);

  const [timer, setTimer] = useState(1500);
  const [start, setStart] = useState(false);
  const [feature, setFeature] = useState("pomodoro");
  const firstStart = useRef(true);
  const tick = useRef<any>(null);
  const featuresFixed = ["pomodoro", "short break", "long break"];

  const toggleStart = () => {
    setStart(!start);
    play();
    return clearInterval(tick.current);
  };

  useEffect(() => {
    play();

    if (firstStart.current) {
      // primeiro render, não rodar useEffect
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer: any) => (timer !== 0 ? timer - 1 : 0));
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  useEffect(() => {
    if (timer === 0) toggleStart();
  }, [timer]);

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#1e213f",
          height: "100vh",
        }}
      >
        <Row
          style={{ color: "white", padding: "2% 0%" }}
          className="d-flex justify-content-evenly"
        >
          relógio pomodoro
        </Row>

        <SwipTabView
          setTimer={setTimer}
          mode={objectPomodoro?.mode}
          setObjectPomodoro={setObjectPomodoro}
          setFeature={setFeature}
          featuresFixed={featuresFixed}
          feature={feature}
        />

        <WrapTimer>
          <WrapStartTimer>
            <span
              style={{
                alignSelf: "flex-end",
                letterSpacing: "5px",
                marginBottom: "8%",
                transition: "all 1s ease",
                transformOrigin: "top",
                transitionDuration: ".3",
              }}
            >
              {!start ? "START" : "STOP"}
            </span>
          </WrapStartTimer>
          <WrapRoundedTimer zindexValue={3}>
            <h1 style={{ alignSelf: "center", fontWeight: "bold" }}>
              {dispSecondsAsMins(timer)}
            </h1>
          </WrapRoundedTimer>
          <WrapRoundedTimer zindexValue={4} onClick={toggleStart}>
            <CircularProgressbar
              value={timer}
              maxValue={timeDefine(feature)}
              strokeWidth={2.5}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "round",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(62, 152, 199, ${timer})`,
                textColor: "#000000",
                trailColor: "#02df1c",
                backgroundColor: "#ffffff",
              })}
            />
          </WrapRoundedTimer>
          <WrapRoundedBackground />
        </WrapTimer>

        <Row>
          <Col
            className="d-flex justify-content-evenly"
            style={{ width: "20%" }}
          >
            <MdSettings
              style={{ cursor: "pointer" }}
              size={24}
              color="#737997"
              onClick={() => alert(":) estamos em desenvolvimento.")}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(App);

const WrapTimer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 54%;
  width: 100%;
  margin: 4% 0;
  color: white;
`;

const WrapRoundedTimer = styled.div<{ zindexValue?: number }>`
  z-index: ${(props) => (props.zindexValue ? props.zindexValue : null)};
  position: absolute;
  display: flex;
  border-radius: 100%;
  width: 290px;
  height: 290px;
  padding: 8px;
  justify-content: center;
  cursor: pointer;
`;

const WrapRoundedBackground = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  width: 348px;
  height: 348px;
  border-radius: 100%;
  box-shadow: 35px 35px 70px #171930, -35px -35px 70px #25294e;
  padding: 8px;
  box-sizing: border-box;
`;

const WrapStartTimer = styled.div`
  display: flex;
  border-radius: 100%;
  background: linear-gradient(transparent, transparent) padding-box,
    linear-gradient(to top, #1e213f, #25294e) border-box;
  border: 4px solid transparent;
  width: 300px;
  height: 300px;
  z-index: 2;
  position: absolute;
  justify-content: center;
  padding: 32px;
`;
