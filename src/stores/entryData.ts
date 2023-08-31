import { defineStore } from "pinia";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";

import { EntriesOfYear, Entry } from "../../types";

import { getDate, extend } from "@/utils";
import { getEntriesOfYears } from "@/api";

export const useEntryStore = defineStore("entry-list", {
  state: () => ({
    // bonus
    dateValue: dayjs(getDate(dayjs())),
    // Entries data
    entriesOfYears: getEntriesOfYears(),
  }),
  actions: {
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
            message.success("Save successfully!", 3);
            entriesOfYear.entries.unshift({ ...entryValue });
          }
          break;
        }
      }
      if (checkYear) {
        this.entriesOfYears.unshift({
          year: entryValue.time.year(),
          entries: [{ ...entryValue }],
        });
      }
    },
  },
});
