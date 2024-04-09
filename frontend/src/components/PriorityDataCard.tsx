import { useEffect, useState } from "react";
import ITask from "../types/task";
import * as HelperFunctions from "../HelperFunctions/TaskSorts";
import PriorityCardStyle from "../styles/PriorityDataCardStyle.module.css";



interface PriorityDataCardInterface {
    tasks: ITask[];
    className?: React.CSSProperties;
  }


const PriorityDataCard = ({tasks, className}:PriorityDataCardInterface) => {
  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);

  useEffect(() => {
    const prioritiesCount = HelperFunctions.countByPriority(tasks);
    setLowPriorityCount(prioritiesCount.low);
    setMediumPriorityCount(prioritiesCount.medium);
    setHighPriorityCount(prioritiesCount.high);
  }, [tasks]);

    return(
      <>
        <div className={PriorityCardStyle.PriorityContainer}>
          <div >{lowPriorityCount + mediumPriorityCount + highPriorityCount}</div>
          <div className="PriorityLow">{lowPriorityCount}</div>
          <div className="PriorityMedium">{mediumPriorityCount}</div>
          <div className="PriorityHigh">{highPriorityCount}</div>
        </div>
      </>
    );
  };
  
  export default PriorityDataCard;