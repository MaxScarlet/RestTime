import { Link } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import "./Home.css";
import BarChart from "../../DataArea/BarChart/BarChart";
import { useEffect, useState } from "react";
import reportsService from "../../../Services/ReportsService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import vacationService from "../../../Services/VacationService";

function Home(): JSX.Element {
  const dbName = appConfig.WebSiteName;
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favName, setFavName] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false); // Set refresh state for the cards
  const { token, logout, isAdmin } = useAuth();

  async function fetchData() {
    try {
      const chartData = await reportsService.getAll();
      setFavorites(chartData);
      setRefresh(true);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }

  async function fetchFavNames(ids: string[]) {
    try {
      const favNames = await Promise.all(
        ids.map((id) => vacationService.getInfo(id))
      );
      setFavName(favNames);
      setRefresh(false); // Set refresh to false after successfully fetching data
    } catch (error) {
      console.error("Error fetching favorite names:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Only run this effect once, on component mount

  useEffect(() => {
    if (refresh) {
      const ids = favorites.map((item) => item._id);
      fetchFavNames(ids);
    }
  }, [refresh, favorites]);

  const data = favorites.map((item) => item.count);
  const labels = favName.map((item) => item.place);

  return (
    <div className="Home">
      <main>
        {/* Hero section with a call-to-action */}
        <h1>Welcome to {dbName}</h1>
        <p>Your adventure begins here.</p>
        <Link to="/vacation" className="cta-button">
          Explore Tours
        </Link>
        <div style={{ maxWidth: "400px" }}>
          {refresh ? (
            <p>Loading chart...</p>
          ) : (
            <BarChart data={data} labels={labels} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
