import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const FooterComponent = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            href="/" // Assuming you might want a link here to the home page or elsewhere
          >
            {/* Placeholder if you want to include an icon or logo */}
            <FontAwesomeIcon icon={faTwitter} size="lg" />{" "}
            {/* Example: Twitter icon used as logo */}
          </a>
          <span className="mb-3 mb-md-0 text-muted">
            © 2024 Pizza Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default FooterComponent;
