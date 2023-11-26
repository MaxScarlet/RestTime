/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import "./Home.css";
import { useEffect, useState } from "react";

function Home(): JSX.Element {
  const dbName = appConfig.WebSiteName;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };
    const updateGreeting = () => {
      if (currentDate.getHours() < 12) {
        setGreeting("Good morning");
      } else if (currentDate.getHours() < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };
    setInterval(() => {
      updateCurrentDate();
      updateGreeting();
    });
  }, [currentDate]);

  return (
    <div className="Home">
      <main>
        <h1>{`${greeting}, welcome to ${dbName}`}</h1>
        <p>Your adventure begins here.</p>
        <Link to="/vacation" className="cta-button">
          Explore Tours
        </Link>
      </main>
    </div>
  );
}

export default Home;
