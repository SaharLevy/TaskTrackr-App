import { Chart } from "react-google-charts";
import styles from "../styles/PriorityDataCardStyle.module.css"

interface ChartPieInterface {
    LowPriorityCount: number;
    MediumPriorityCount: number;
    HighPriorityCount: number;
}

const options = {
    title: "My Tasks Priorities",
    is3D: true,
  };

const ChartPie = (PriorityProps : ChartPieInterface) => {

    const data = [
        ["Task", "Count"],
        ["Low Priority", PriorityProps.LowPriorityCount],
        ["Medium Priority", PriorityProps.MediumPriorityCount],
        ["High Priority", PriorityProps.HighPriorityCount],
    ];

    return(
<Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"90%"}
      className={styles.InnerGraph}
/>

    )
}

export default ChartPie