import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Upload</Link>
            </li>
            <li>
              <Link to="/confirm">Confirm</Link>
            </li>
            <li>
              <Link to="/inspect">Inspect</Link>
            </li>
          </ul>
        </nav>
    )
  };

export default Navigation;