<script setup lang="ts">
import { ref } from "vue";
import { Dayjs } from "dayjs";

import { getDate } from "@/utils";

import { Filter, EntriesOfYear, Entry } from "../../../types";

defineProps<{
  data1: {
    isShowDetail: Boolean;
    dateValue: Dayjs;
    entriesOfYears: EntriesOfYear[];
    getEmotionUrl: (emotion: number) => string;
    handleShowEntryDetail: (entry: Entry) => void;
  };
}>();

// Filter
const filterValue = ref<Dayjs>();
const filter = ref<Filter>("");

// const showTime = () => {
//   console.log(filterValue.value);
// };
</script>

<template>
  <!-- List entries -->
  <div
    class="px-4 lg:w-1/3 relative lg:block"
    :class="{ hidden: data1.isShowDetail }"
  >
    <!-- Filter -->
    <div class="flex items-center justify-between">
      <span class="font-medium text-lg color lg:hidden">Tìm kiếm</span>

      <div class="lg:flex lg:w-full">
        <a-date-picker
          v-model:value="filterValue"
          :picker="filter"
          class="w-40 lg:flex-1"
          :inputReadOnly="true"
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

    <!-- Entry list -->
    <div class="entries mt-3 overflow-auto">
      <div
        v-for="(entriesOfYear, indexEntriesOfYear) in data1.entriesOfYears"
        :key="indexEntriesOfYear"
      >
        <a-divider orientation="left">
          <span class="text-xl">{{ entriesOfYear.year }}</span>
        </a-divider>

        <div
          v-for="(entry, indexEntry) in entriesOfYear.entries"
          class="color-bg-entry flex p-2 rounded-md mb-3 cursor-pointer"
          :class="
            getDate(entry.time) === getDate(data1.dateValue) ? 'selected' : ''
          "
          :key="indexEntry"
          @click="data1.handleShowEntryDetail(entry)"
        >
          <div class="flex flex-col items-center w-16">
            <div class="flex items-center justify-between w-full">
              <img
                :src="data1.getEmotionUrl(entry.emotion)"
                alt="icon"
                class="w-7"
              />
              <div class="text-xs">{{ entry.time.format("MMM") }}</div>
            </div>

            <div class="text-2xl font-semibold">
              {{ entry.time.date() }}
            </div>

            <div class="text-sm">{{ entry.time.format("ddd") }}</div>
          </div>

          <a-divider
            type="vertical"
            class="h-20"
          />

          <div class="flex flex-col flex-1">
            <div class="limited-line-1 text-lg">
              {{ entry.title }}
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
  &.selected {
    background-color: rgba($color: #fff9ba, $alpha: 1);
  }

  background-color: rgba($color: #fff9ba, $alpha: 0.5);
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

.entries {
  height: calc(100vh - 150px);
}
</style>
