<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

import { Entry } from "../../../types";

import { extend, getDate, getTime } from "@/utils";
import { useEntryStore } from "@/stores";

const entryStore = useEntryStore();

// Time entry
const timeNow = dayjs();
const timeValue = ref<Dayjs>(dayjs(getTime(timeNow), "HH:mm"));

// Entry
const entryValue = reactive<Entry>({
  emotion: 1,
  time: dayjs(getDate(entryStore.dateValue) + " " + getTime(timeValue.value)),
  title: "",
  content: "",
  checked: false,
});

const dateValue = ref<Dayjs>(entryStore.dateValue);
for (const entriesOfYear of entryStore.entriesOfYears) {
  if (entriesOfYear.year === dateValue.value.year()) {
    for (const entry of entriesOfYear.entries) {
      if (getDate(entry.time) === getDate(dateValue.value)) {
        extend(entryValue, entry);
        timeValue.value = entry.time;
        break;
      }
    }
    break;
  }
}

// Change entryValue.time
watch(
  () => [entryStore.dateValue, timeValue.value],
  () => {
    dateValue.value = entryStore.dateValue;
    entryValue.time = dayjs(
      getDate(entryStore.dateValue) + " " + getTime(timeValue.value),
    );
  },
);

// Check dateValue has entry yet?
watch(
  () => dateValue.value,
  (newValue) => {
    entryStore.changeDate(newValue);
    for (const entriesOfYear of entryStore.entriesOfYears) {
      if (entriesOfYear.year === newValue.year()) {
        for (const entry of entriesOfYear.entries) {
          if (getDate(entry.time) === getDate(newValue)) {
            extend(entryValue, entry);
            timeValue.value = entry.time;
            break;
          }
        }
        break;
      }
    }
  },
);

// Emotion
const emotions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const handleChangeEmotion = (emotion: number) => {
  entryValue.emotion = emotion;
};
const getEmotionUrl = (emotion: number) => {
  return `/assets/icons/emotions/emotion${emotion}.svg`;
};

// Handle create entry
const createNewEntry = () => {
  entryValue.emotion = 1;
  timeValue.value = dayjs(getTime(timeNow), "HH:mm");
  entryStore.dateValue = dayjs(getDate(timeNow));
  entryValue.title = "";
  entryValue.content = "";
  for (const entriesOfYear of entryStore.entriesOfYears) {
    if (entriesOfYear.year === entryStore.dateValue.year()) {
      for (const entry of entriesOfYear.entries) {
        if (getDate(entry.time) === getDate(entryStore.dateValue)) {
          message.info("There is 1 record for today.", 3);
          break;
        }
      }
      break;
    }
  }
};

// Handle save
const handleSaveEntry = () => {
  entryStore.saveEntry(entryValue);
  console.log(entryValue);
};

// Handle click back-btn
const router = useRouter();
const handleBackToList = () => {
  router.go(-1);
};
</script>

<template>
  <!-- Detail entry -->
  <div class="flex-1 lg:mr-4 h-full">
    <div
      class="flex flex-col detail-entry bg-white p-3 pt-2 w-11/12 h-full m-auto overflow-auto"
    >
      <div
        class="flex flex-col-reverse lg:flex-row border-b pb-1 border-slate-200"
      >
        <!-- Time -->
        <div class="flex justify-between items-center flex-1 mt-3 lg:mt-0">
          <div>
            <a-date-picker
              v-model:value="dateValue"
              :inputReadOnly="true"
              :allowClear="false"
              class="w-32"
            />
            <a-time-picker
              v-model:value="timeValue"
              format="HH:mm"
              :inputReadOnly="true"
              :allowClear="false"
              class="ml-2 w-20"
            />
          </div>

          <!-- Icon -->
          <a-dropdown
            trigger="click"
            placement="bottomRight"
          >
            <div
              class="emotion-icon rounded cursor-pointer"
              title="Your emotion"
            >
              <img
                :src="getEmotionUrl(entryValue.emotion)"
                alt="emotion"
                class="w-10"
              />
            </div>
            <template #overlay>
              <a-menu class="grid grid-flow-row grid-cols-4">
                <a-menu-item
                  v-for="(emotion, index) in emotions"
                  :key="index"
                  @click="handleChangeEmotion(emotion)"
                  class=""
                >
                  <img
                    :src="getEmotionUrl(emotion)"
                    alt="emotion"
                    class="w-10"
                  />
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>

        <!-- Actions -->
        <div class="flex items-center">
          <a-divider
            type="vertical"
            class="h-6 hidden lg:block"
          />

          <div class="flex justify-between flex-1">
            <a-button
              class="font-bold lg:hidden"
              @click="handleBackToList"
            >
              <div class="flex items-center justify-center">
                <left-outlined />
                <span class="ml-2">Back</span>
              </div>
            </a-button>

            <div>
              <a-button
                class="ml-3 font-bold"
                @click="createNewEntry"
                title="Create a new entry for today"
              >
                New entry
              </a-button>

              <!-- Save button -->
              <a-button
                class="ml-3 font-bold green-btn"
                @click="handleSaveEntry"
                :disabled="!entryValue.title"
              >
                Save
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Title -->
      <div class="border-b border-slate-200">
        <a-textarea
          v-model:value="entryValue.title"
          placeholder="Enter your heading..."
          auto-size
          spellcheck="false"
          :bordered="false"
          class="text-lg"
        />
      </div>

      <!-- Content -->
      <a-textarea
        v-model:value="entryValue.content"
        placeholder="Enter your content..."
        spellcheck="false"
        :bordered="false"
        class="h-content flex-1 !max-h-full lg:h-full !resize-none text-base"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.emotion-icon {
  padding: 5px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
