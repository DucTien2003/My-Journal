import { defineStore } from "pinia";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";

import { EntriesOfYear, Entry, Filter } from "../../types";

import { getDate, extend } from "@/utils";
import { getEntriesOfYears } from "@/api";

// sort and insert 1 element into entry list
const binaryInsertEntry = (arr: any, element: any) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid].year) {
      if (arr[mid].year > element.year) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else if (arr[mid].time) {
      if (arr[mid].time.isAfter(element.time)) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  arr.splice(left, 0, element);
};

// getEntriesOfYears().then((data) => console.log(data));

export const useEntryStore = defineStore("entry-list", {
  state: () => ({
    dateValue: dayjs(getDate(dayjs())) as Dayjs,
    // Entries data
    entriesOfYears: [] as EntriesOfYear[],
  }),
  getters: {
    listFilter:
      (state) =>
      (date: Dayjs | undefined, filterType: Filter): EntriesOfYear[] => {
        if (date === null || date === undefined) {
          return state.entriesOfYears;
        } else {
          if (filterType === "") {
            return state.entriesOfYears.filter(
              (entriesOfYear: EntriesOfYear) => {
                for (const entry of entriesOfYear.entries) {
                  return entry.time.isSame(date, "day");
                }
              },
            );
          } else if (filterType === "month" || filterType === "year") {
            return state.entriesOfYears.filter(
              (entriesOfYear: EntriesOfYear) => {
                for (const entry of entriesOfYear.entries) {
                  return (
                    entry.time.isAfter(date.startOf(filterType)) &&
                    entry.time.isBefore(date.endOf(filterType))
                  );
                }
              },
            );
          } else {
            return [];
          }
        }
      },
  },
  actions: {
    fetchEntriesOfYears() {
      getEntriesOfYears().then((data) => (this.entriesOfYears = data));
    },
    changeDate(date: Dayjs) {
      this.dateValue = date;
    },
    deleteEntry() {
      let empty: boolean = false;
      for (const entriesOfYear of this.entriesOfYears) {
        const temp: Entry[] = entriesOfYear.entries.filter(
          (ent) => !ent.checked,
        );
        if (temp.length === 0) {
          empty = true;
        }
        entriesOfYear.entries.splice(0, entriesOfYear.entries.length);
        extend(entriesOfYear.entries, temp);
      }
      if (empty) {
        const temp: EntriesOfYear[] = this.entriesOfYears.filter(
          (entOfYear) => entOfYear.entries.length > 0,
        );
        this.entriesOfYears.splice(0, this.entriesOfYears.length);
        extend(this.entriesOfYears, temp);
      }
    },
    saveEntry(entryValue: Entry) {
      let checkYear = true;
      let checkDate = true;
      for (const entriesOfYear of this.entriesOfYears) {
        if (entriesOfYear.year === entryValue.time.year()) {
          checkYear = false;
          for (const entry of entriesOfYear.entries) {
            if (getDate(entry.time) === getDate(entryValue.time)) {
              checkDate = false;
              extend(entry, entryValue);
              message.success("Save successfully!", 3);
              break;
            }
          }
          if (checkDate) {
            binaryInsertEntry(entriesOfYear.entries, { ...entryValue });
            message.success("Save successfully!", 3);
          }
          break;
        }
      }
      if (checkYear) {
        binaryInsertEntry(this.entriesOfYears, {
          year: entryValue.time.year(),
          entries: [{ ...entryValue }],
        });
      }
    },
  },
});
