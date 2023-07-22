<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Dayjs } from "dayjs";

import { Entry } from "../../types/entry";
import { Filter } from "../../types/filter";

interface EntriesOfYear {
  year: number;
  entries: Entry[] | [];
}

const filter = ref<Filter>("");
const filterValue = ref<Dayjs>();

// const showTime = () => {
//   console.log(filterValue.value);
// };

const getStatusUrl = (status: string) => {
  return `/assets/icons/imotions/imotion${status}.svg`;
};

const entriesOfYears = reactive<EntriesOfYear[]>([
  {
    year: 2018,
    entries: [
      {
        status: "1",
        time: "10:57",
        dayMonth: "20",
        dayWeek: "Wed",
        month: "Jul",
        year: 2018,
        header: "hello world",
        content: "this is first entry",
      },
      {
        status: "5",
        time: "03:04",
        dayMonth: "04",
        dayWeek: "fri",
        month: "Apr",
        year: 2018,
        header: "hello world",
        content: "this is first entry",
      },
      {
        status: "5",
        time: "10:57",
        dayMonth: "10",
        dayWeek: "fri",
        month: "Sep",
        year: 2018,
        header: "hello world",
        content: "this is first entry",
      },
    ],
  },
  {
    year: 2016,
    entries: [
      {
        status: "3",
        time: "10:57",
        dayMonth: "20",
        dayWeek: "fri",
        month: "Dec",
        year: 2016,
        header: "hello world",
        content: "this is first entry",
      },
      {
        status: "4",
        time: "03:04",
        dayMonth: "04",
        dayWeek: "fri",
        month: "Jan",
        year: 2016,
        header: "hello world",
        content: "this is first entry",
      },
      {
        status: "2",
        time: "10:57",
        dayMonth: "10",
        dayWeek: "fri",
        month: "Feb",
        year: 2016,
        header: "hello world",
        content: "this is first entry",
      },
    ],
  },
]);
</script>

<template>
  <div class="mt-4 px-4">
    <!-- filter -->
    <div class="flex items-center justify-between">
      <span class="font-medium text-lg color">Tìm kiếm</span>

      <div>
        <a-date-picker
          v-model:value="filterValue"
          :picker="filter"
          class="w-40"
        />

        <a-select
          v-model:value="filter"
          class="w-24 ml-1"
        >
          <a-select-option value="">Day</a-select-option>
          <a-select-option value="week">Week</a-select-option>
          <a-select-option value="month">Month</a-select-option>
          <a-select-option value="quarter">Quarter</a-select-option>
          <a-select-option value="year">Year</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- content -->
    <div class="content mt-3 overflow-auto">
      <div
        v-for="(entriesOfYear, index) in entriesOfYears"
        :key="index"
      >
        <a-divider orientation="left">
          <span class="text-xl">{{ entriesOfYear.year }}</span>
        </a-divider>

        <div
          v-for="(entry, index) in entriesOfYear.entries"
          class="color-bg-entry flex p-2 rounded-md mb-3"
          :key="index"
        >
          <div class="flex items-center">
            <div class="flex flex-col items-center w-16">
              <div class="flex items-center justify-between w-full">
                <img
                  :src="getStatusUrl(entry.status)"
                  alt="icon"
                  class="w-7"
                />

                <div class="text-xs">{{ entry.month }}</div>
              </div>
              <div class="text-2xl font-semibold">{{ entry.dayMonth }}</div>
              <div class="text-sm">{{ entry.dayWeek }}</div>
            </div>

            <a-divider
              type="vertical"
              class="h-20"
            />
          </div>

          <div class="flex flex-col flex-1">
            <div
              class="limited-line-1 text-lg"
              title="Header Header Header Header Header Header"
            >
              {{ entry.header }}
            </div>
            <div class="limited-line-2 text-sm mt-1">
              {{ entry.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color-bg-entry {
  background-color: rgba($color: #fff9ba, $alpha: 0.7);
}

.limited-line-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.limited-line-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.content {
  height: calc(100vh - 150px);
}
</style>
