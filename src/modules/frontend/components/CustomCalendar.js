import "../styles/calendar.css";

import { Paper, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Calendar } from "react-calendar";

const CustomCalendar = ({ onDatesChange, dates }) => {
  const [value, setValue] = useState([]);

  const onChange = (newValue) => {
    setValue(newValue);
    if (newValue.length === 2) {
      const [start, end] =
        newValue[0] < newValue[1]
          ? [newValue[0], newValue[1]]
          : [newValue[1], newValue[0]];
      const dynamicColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      const newDate = {
        start,
        end,
        color: dynamicColor,
      };
      onDatesChange([...dates, newDate])
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Iteruje přes všechny vybrané datumové rozsahy
      for (const range of dates) {
        const { start, end, color } = range;
        const isInRange = date >= start && date <= end;

        // Pokud je aktuální datum uvnitř nějakého z rozsahů
        if (isInRange) {
          // Vrátí div prvek, který vyplní celé políčko kalendáře barvou
          return (
            <div
              style={{
                height: "100%", // Výška prveku je 100% rodiče
                width: "150%", // Šířka prveku je 100% rodiče
                backgroundColor: color, // Nastavuje barvu pozadí
                opacity: 1, // Nastavuje průhlednost na plnou (1)
                position: "relative", // Použijeme absolutní pozicování
                left: "-10px", // Div začne na levém okraji buňky
              }}
            ></div>
          );
        }
      }
    }

    // Vrátí null, pokud datum není v žádném vybraném rozsahu
    return null;
  };

  return (
    <Paper elevation={2}>
      <Stack paddingX={10} paddingY={10}>
        <Calendar
          onChange={onChange}
          selectRange
          tileContent={tileContent}
          tileClassName={"calendarTile"}
          showDoubleView
          disabled={false}
        />
      </Stack>
    </Paper>
  );
};

export default CustomCalendar;
