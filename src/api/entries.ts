import { EntriesOfYear } from "./../../types/entriesOfYear";
import { reactive } from "vue";
import dayjs from "dayjs";

interface RawEntry {
  emotion: number;
  time: string;
  title: string;
  content: string;
}

interface RawEntriesOfYear {
  year: number;
  entries: RawEntry[];
}

// Entries data
const EntriesOfYears = reactive<RawEntriesOfYear[]>([
  {
    year: 2018,
    entries: [
      {
        emotion: 1,
        time: "2018-12-10 10:57",
        title: "hello world",
        content: "this is first entry",
      },
      {
        emotion: 5,
        time: "2018-09-12 03:04",
        title: "hello world",
        content: "this is first entry",
      },
      {
        emotion: 6,
        time: "2018-04-08 00:07",
        title: "hello world",
        content: "this is first entry",
      },
    ],
  },
  {
    year: 2016,
    entries: [
      {
        emotion: 8,
        time: "2016-09-07 05:50",
        title: "hello world",
        content: "this is first entry",
      },
      {
        emotion: 2,
        time: "2016-02-17 13:24",
        title: "hello world",
        content: "this is first entry",
      },
      {
        emotion: 1,
        time: "2016-01-01 17:00",
        title: "hello world",
        content: "this is first entry",
      },
    ],
  },
]);

// Handle time string => Dayjs
export const getEntriesOfYears = (): EntriesOfYear[] => {
  return EntriesOfYears.map((entriesOfYear: RawEntriesOfYear) => {
    return {
      ...entriesOfYear,
      entries: entriesOfYear.entries.map((entry: RawEntry) => {
        return {
          ...entry,
          checked: false,
          time: dayjs(entry.time),
        };
      }),
    };
  });
};
