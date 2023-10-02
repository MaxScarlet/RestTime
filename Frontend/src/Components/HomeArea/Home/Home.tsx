/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import "./Home.css";

function Home(): JSX.Element {
  const dbName = appConfig.WebSiteName;

  return (
    <div className="Home">
      <main>
        {/* Hero section with a call-to-action */}
        <h1>Welcome to {dbName}</h1>
        <p>Your adventure begins here.</p>
        <Link to="/vacation" className="cta-button">
          Explore Tours
        </Link>
      </main>
    </div>
  );
}

export default Home;
