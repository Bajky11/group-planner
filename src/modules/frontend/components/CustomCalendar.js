import "../styles/calendar.css";

import { Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Calendar } from "react-calendar";

const CustomCalendar = ({
  onDatesChange,
  dates,
  onValueChange,
  possibleDates,
}) => {
  const [value, setValue] = useState([]);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const onChange = (newValue) => {
    setValue(newValue);
    if (newValue.length === 2) {
      const [start, end] =
        newValue[0] < newValue[1]
          ? [newValue[0], newValue[1]]
          : [newValue[1], newValue[0]];

      if (onValueChange) {
        onValueChange({ start, end });
      }

      const dynamicColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;

      if (onDatesChange) {
        onDatesChange([
          ...dates,
          {
            start,
            end,
            color: dynamicColor,
          },
        ]);
      }
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Najde všechny rozsahy, které obsahují aktuální datum
      const rangesInDate = dates.filter(
        (range) => date >= range.start && date <= range.end
      );

      const possibleRanges = possibleDates.filter(
        (range) => date >= range.start && date <= range.end
      );

      // Pokud existují rozsahy obsahující aktuální datum
      if (rangesInDate.length > 0 || possibleRanges.length > 0) {
        return (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              gap: "2px",
              flexDirection: "column",
              alignItems: "center",
              position: "relative", // Přidána pozice relativní
              backgroundColor:
                possibleRanges.length > 0
                  ? "rgba(230,138, 0, 0.35)"
                  : "transparent",
            }}
          >
            {rangesInDate.map((range, index) => (
              <div
                key={index}
                style={{
                  height: "10%", // Výška prvku je 10% rodiče
                  width: "150%", // Šířka prvku je 150% rodiče
                  backgroundColor: range.color, // Nastavuje barvu pozadí
                  opacity: 1, // Nastavuje průhlednost na plnou (1)
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "10px",
                }}
              >
                <p style={{ fontSize: "8px", color: "black" }}>
                  {range.name && range.name}
                </p>
              </div>
            ))}
          </div>
        );
      }
    }

    // Vrátí null, pokud datum není v žádném vybraném rozsahu
    return null;
  };

  return (
    <Paper elevation={2}>
      <Stack paddingX={3} paddingY={3}>
        <Calendar
          onChange={onChange}
          selectRange
          tileContent={tileContent}
          //tileClassName={"calendarTile"}
          showDoubleView={isLargeScreen ? true : false}
          disabled={false}
        />
      </Stack>
    </Paper>
  );
};

export default CustomCalendar;
