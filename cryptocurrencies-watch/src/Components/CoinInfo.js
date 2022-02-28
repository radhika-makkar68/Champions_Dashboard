import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartInfo } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider, createTheme, CircularProgress } from "@mui/material";
import { chartDays } from "../config/data";
import ButtonComp from "./ButtonComp";

function CoinInfo({ coin }) {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchChartInfo = async () => {
    const { data } = await axios.get(ChartInfo(coin.id, days, currency));
    setChartData(data.prices);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetchChartInfo();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="chartContainer">
        {!chartData ? (
          <CircularProgress
            style={{
              color: "#47c2be",
            }}
            size={80}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: chartData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM}`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: chartData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#47c2be",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "Wrap",
              }}
            >
              {chartDays.map((day) => (
                <ButtonComp
                  onClick={() => setDays(day.value)}
                  key={day.label}
                  selected={day.value === days}
                >
                  {day.label}
                </ButtonComp>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
