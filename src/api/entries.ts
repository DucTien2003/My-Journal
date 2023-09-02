import dayjs from "dayjs";
import axios from "axios";

import { EntriesOfYear, Entry } from "../../types";

// Export a function to fetch and transform data
export const getEntriesOfYears = async () => {
  try {
    const response = await axios.get(
      "https://649958fb79fbe9bcf83f0f2f.mockapi.io/data/api/entries",
    );

    // Transform data after fetching
    return response.data.map((entriesOfYear: EntriesOfYear) => {
      return {
        ...entriesOfYear,
        entries: entriesOfYear.entries.map((entry: Entry) => {
          return {
            ...entry,
            checked: false,
            time: dayjs(entry.time),
          };
        }),
      };
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    throw error; // Re-throw the error to handle it outside
  }
};
