import { Chart } from "react-google-charts";
import styles from "../styles/PriorityDataCardStyle.module.css";

interface ChartPieInterface {
  LowPriorityCount: number;
  MediumPriorityCount: number;
  HighPriorityCount: number;
}

const options = {
  title: "My Tasks Priorities",
  is3D: true,
  colors: ["#fdf1db", "#99f4ff", "#ffa3a3"],
  pieSliceTextStyle: {
    color: "black", // Change the color of the percentage numbers to black
  },
};

const ChartPie = (PriorityProps: ChartPieInterface) => {
  const data = [
    ["Task", "Count"],
    ["Low Priority", PriorityProps.LowPriorityCount],
    ["Medium Priority", PriorityProps.MediumPriorityCount],
    ["High Priority", PriorityProps.HighPriorityCount],
  ];

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
};

export default ChartPie;
