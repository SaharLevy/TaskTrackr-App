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
        <div className={`${PriorityCardStyle.PriorityContainer}`}>
          <div className={`${PriorityCardStyle.LeftSideDivs}`}>
            <div className={`${PriorityCardStyle.PriorityTotal} ${PriorityCardStyle.PriorityCardSize} ${PriorityCardStyle.PositionRelative}`}>
              <p className={`${PriorityCardStyle.CenterText}`}>Total Tasks:</p>
              {lowPriorityCount + mediumPriorityCount + highPriorityCount}</div>
            <div className={`${PriorityCardStyle.PriorityLow} ${PriorityCardStyle.PriorityCardSize}`}>{lowPriorityCount}</div>
          </div>
          <div className={`${PriorityCardStyle.RightSideDivs}`}> 
            <div className={`${PriorityCardStyle.PriorityMedium} ${PriorityCardStyle.PriorityCardSize}`}>{mediumPriorityCount}</div>
            <div className={`${PriorityCardStyle.PriorityHigh} ${PriorityCardStyle.PriorityCardSize}`}>{highPriorityCount}</div></div>
          <div className={`${PriorityCardStyle.Graph}`}></div>
        </div>
      </>
    );
  };
  
  export default PriorityDataCard;