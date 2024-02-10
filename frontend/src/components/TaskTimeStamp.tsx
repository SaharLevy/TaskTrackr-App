import styles from "../styles/TaskPage.module.css";

const TaskTimeStamp = ({
  timestamp,
  children,
}: {
  timestamp: string | undefined;
  children: React.ReactNode;
}) => {
  const date = new Date(timestamp ?? "");

  const dateFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as const;

  const timeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  } as const;

  // Format the date and time components separately
  const formattedDate = date.toLocaleString("en-US", dateFormatOptions);
  const formattedTime = date.toLocaleString("en-US", timeFormatOptions);

  // Combine the formatted date and time
  const formattedTimestamp = `${formattedDate}, ${formattedTime}`;

  return (
    <div className={`${styles.taskTimeStamp}`}>
      {children}
      {formattedTimestamp}
    </div>
  );
};

export default TaskTimeStamp;
