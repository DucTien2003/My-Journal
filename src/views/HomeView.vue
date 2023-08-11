<script setup lang="ts">
import { ref, reactive } from "vue";
import dayjs, { Dayjs } from "dayjs";

import { Entry, EntriesOfYear } from "../../types";
import { getEntriesOfYears } from "@/api";
import { getDate } from "@/utils";
import EntryList from "@/components/entry/EntryList.vue";
import EntryDetail from "@/components/entry/EntryDetail.vue";

// Entries data
const entriesOfYears = reactive<EntriesOfYear[]>(getEntriesOfYears());

// Handle show entry detail
const isShowDetail = ref<Boolean>(false);
const hiddenDetailEntry = () => {
  isShowDetail.value = false;
};
const showDetailEntry = () => {
  isShowDetail.value = true;
};
const handleShowEntryDetail = (entry: Entry) => {
  showDetailEntry();
  changeDate(entry.time);
};

// Emotion
const getEmotionUrl = (emotion: number) => {
  return `/assets/icons/imotions/imotion${emotion}.svg`;
};

// Time
const timeNow = dayjs();
const dateValue = ref<Dayjs>(dayjs(getDate(timeNow)));
const changeDate = (date: Dayjs) => {
  dateValue.value = date;
};
</script>

<template>
  <div class="py-4 lg:flex h-detail">
    <!-- List entries -->
    <entry-list
      :data1="{
        isShowDetail,
        dateValue,
        entriesOfYears,
        getEmotionUrl,
        handleShowEntryDetail,
      }"
    ></entry-list>

    <!-- Detail entry -->
    <entry-detail
      :data2="{
        isShowDetail,
        dateValue,
        entriesOfYears,
        hiddenDetailEntry,
        showDetailEntry,
        getEmotionUrl,
        changeDate,
      }"
    ></entry-detail>
  </div>
</template>

<style scoped lang="scss">
.h-detail {
  height: calc(100vh - 72px);
}
</style>
