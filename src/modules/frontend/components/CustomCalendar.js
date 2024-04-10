import { Calendar } from "react-calendar";
import { Paper } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";

const CustomCalendar = () => {
  const [value, setValue] = useState([]);
  // Assuming selectedDateRanges includes user information and their color
  const [selectedDateRanges, setSelectedDateRanges] = useState([]);

  const addNewDateRange = (newRange, userColor) => {
    const newDateRange = {
      start: newRange[0],
      end: newRange[1],
      color: userColor,
    };

    setSelectedDateRanges((prevRanges) => [...prevRanges, newDateRange]);
  };

  const onChange = (newValue) => {
    setValue(newValue);
    if (newValue.length === 2) {
      // Example: Dynamically determining the color, e.g., based on user selection or other logic
      const dynamicColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`; // Random color for demonstration
      addNewDateRange(
        newValue.sort((a, b) => a - b),
        dynamicColor
      );
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      for (const range of selectedDateRanges) {
        const { start, end, color } = range;
        const isInRange = date >= start && date <= end;
        if (isInRange) {
          // Return a custom styled component or element to indicate selection
          return (
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: color,
                opacity: 0.5,
              }}
            ></div>
          );
        }
      }
    }
    // Return null if not within any range to keep default tile content
    return null;
  };
  return (
    <Paper elevation={2}>
      <Stack paddingX={10} paddingY={10}>
        <Calendar
          onChange={onChange}
          selectRange
          tileContent={tileContent}
          showDoubleView
          disabled
        />
      </Stack>
    </Paper>
  );
};

export default CustomCalendar;
