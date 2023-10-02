/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import reportsService from "../../../Services/ReportsService";
import vacationService from "../../../Services/VacationService";
import BarChart from "../BarChart/BarChart";
import "./Chart.css";

function Chart(): JSX.Element {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favName, setFavName] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

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

  function downloadCSV() {}
  useEffect(() => {
    fetchData();
  }, []);

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
        <div>
          {refresh ? (
            <p>Loading chart...</p>
          ) : (
            <BarChart data={data} labels={labels} />
          )}
        </div>
        <button onClick={downloadCSV}>Download to CSV</button>
      </main>
    </div>
  );
}

export default Chart;
