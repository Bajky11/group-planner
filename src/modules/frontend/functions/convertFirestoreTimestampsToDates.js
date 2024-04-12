export function convertFirestoreTimestampsToDates(retrievedData) {
  if (!retrievedData) return [];
  console.log(retrievedData);

  return retrievedData.map((item) => {
    const startDate = item.start.toDate();
    const endDate = item.end.toDate();

    return {
      start: startDate,
      end: endDate,
      color: item.color,
    };
  });
}
