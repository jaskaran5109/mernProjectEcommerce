import React from "react";
import "./About.css";
import Bhanu from "../../../images/bhanu.jpg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const About = ({ history }) => {
  return (
    <div className="about">
      <h2 className="aboutMeHeading">About Me</h2>
      <div className="row aboutRow">
        <div className="column aboutColumn">
          <div className="card aboutCard">
            <img className="aboutImage" src={Bhanu} alt="Jaskaran Singh" />
            <div className="aboutcontainer">
              <h2>Jaskaran Singh</h2>
              <p className="aboutTitle">Student & Developer</p>
              <p className="aboutDesc">
                I live in Modinagar. I am currently pursuing B.Tech in Computer
                Science Engineering from SRM University NCR Campus.
              </p>
              <p>
                <Button
                  onClick={(e) => history.push("/contact")}
                  variant="contained"
                  className="aboutButton"
                >
                  Contact
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
