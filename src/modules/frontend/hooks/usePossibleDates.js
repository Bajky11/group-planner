import { useEffect, useState } from "react";

import { fetchDocumentField } from "../../backend/fetchDocumentField";

export const usePossibleDates = (groupId) => {
    const [possibleDates, setPossibleDates] = useState([]);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const value = await fetchDocumentField("groups", groupId, "possibleDates");
          const processedData = proccesFetchedPossibleDates(value);
          setPossibleDates(processedData);
        } catch (error) {
          console.error(error);
        }
      };
  
      loadData();
    }, [groupId]);
  
    function proccesFetchedPossibleDates(dates) {
      return dates.map((date) => {
        return {
          ...date,
          start: date.start.toDate(),
          end: date.end.toDate(),
        };
      });
    }
  
    return possibleDates;
  };