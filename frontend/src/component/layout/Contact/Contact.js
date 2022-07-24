import React, { useEffect, useState } from "react";
import MetaData from "../MetaData";
import emailjs from "emailjs-com";
import "./Contact.css";
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useAlert } from "react-alert";
const Contact = () => {
  const alert=useAlert();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    if (name === "" || email === "" || subject === "" || message === "") return;
  }, []);
  function sendEmail(e) {
    e.preventDefault();
    if (name === "" || email === "" || subject === "" || message === "")
      alert.error("Fields Cannot Be Empty");
    emailjs
      .sendForm("gmail", "template_niveb1x", e.target, "ztzqG5KqmDp35pLdM")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setname("");
    setemail("");
    setsubject("");
    setmessage("");
    alert.success("Message sent successfully");
  }
  return (
    <section id="contact">
      <MetaData title="Contact Me" />
      <h1 className="section-header">Contact Me</h1>

      <div className="contact-wrapper">
        <form
          id="contact-form"
          className="form-horizontal"
          onSubmit={sendEmail}
        >
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="NAME"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="EMAIL"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="subject"
                className="form-control"
                id="subject"
                placeholder="SUBJECT"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <textarea
                className="form-control"
                rows="10"
                placeholder="MESSAGE"
                name="message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            id="contact-button"
            variant="contained"
            type="submit"
            value="SEND"
            endIcon={<Send />}
          >
            Send
          </Button>
        </form>

        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <i className="fa fa-map-marker fa-2x">
                <span className="contact-text place">
                  Modinagar, Uttar-Pradesh
                </span>
              </i>
            </li>

            <li className="list-item">
              <i className="fa fa-phone fa-2x">
                <span className="contact-text phone">
                  <a href="+91 7500224998" title="Give me a call">
                    +91 7500224998
                  </a>
                </span>
              </i>
            </li>

            <li className="list-item">
              <i className="fa fa-envelope fa-2x">
                <span className="contact-text gmail">
                  <a href="mailto:#" title="Send me an email">
                    singhjaskaran2810@gmail.com
                  </a>
                </span>
              </i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
