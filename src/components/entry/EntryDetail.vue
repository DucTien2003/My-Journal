<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons-vue";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";

import { extend, getDate, getTime } from "@/utils";
import { EntriesOfYear, Entry } from "../../../types";

const props = defineProps<{
  data2: {
    isShowDetail: Boolean;
    dateValue: Dayjs;
    entriesOfYears: EntriesOfYear[];
    hiddenDetailEntry: () => void;
    showDetailEntry: () => void;
    getEmotionUrl: (emotion: number) => string;
    changeDate: (date: Dayjs) => void;
  };
}>();

// Date-Time entry
const timeNow = dayjs();
const dateValue = ref<Dayjs>(props.data2.dateValue);
const timeValue = ref<Dayjs>(dayjs(getTime(timeNow), "HH:mm"));
watch(
  () => [props.data2.dateValue, timeValue.value],
  () => {
    dateValue.value = props.data2.dateValue;
    entryValue.time = dayjs(
      getDate(props.data2.dateValue) + " " + getTime(timeValue.value),
    );
  },
);
watch(
  () => dateValue.value,
  (newValue) => {
    props.data2.changeDate(newValue);
    for (const entriesOfYear of props.data2.entriesOfYears) {
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

// Entry
const entryValue = reactive<Entry>({
  emotion: 1,
  time: dayjs(getDate(props.data2.dateValue) + " " + getTime(timeValue.value)),
  title: "",
  content: "",
  checked: false,
});

// imotions
const imotions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const handleChangeImotion = (emotion: number) => {
  entryValue.emotion = emotion;
};

// Handle create entry
const createNewEntry = () => {
  props.data2.showDetailEntry();
  entryValue.emotion = 1;
  timeValue.value = dayjs(getTime(timeNow), "HH:mm");
  props.data2.dateValue = dayjs(getDate(timeNow));
  entryValue.title = "";
  entryValue.content = "";
  for (const entriesOfYear of props.data2.entriesOfYears) {
    if (entriesOfYear.year === props.data2.dateValue.year()) {
      for (const entry of entriesOfYear.entries) {
        if (getDate(entry.time) === getDate(props.data2.dateValue)) {
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
  let checkYear = true;
  let checkDate = true;
  for (const entriesOfYear of props.data2.entriesOfYears) {
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
    props.data2.entriesOfYears.unshift({
      year: entryValue.time.year(),
      entries: [{ ...entryValue }],
    });
  }
  console.log(entryValue);
};
</script>

<template>
  <!-- Detail entry -->
  <div
    class="flex-1 lg:mr-4 lg:block h-full"
    :class="{ hidden: !data2.isShowDetail }"
  >
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
              class="imotion-icon rounded cursor-pointer"
              title="Your emotion"
            >
              <img
                :src="data2.getEmotionUrl(entryValue.emotion)"
                alt="imotion"
                class="w-10"
              />
            </div>
            <template #overlay>
              <a-menu class="grid grid-flow-row grid-cols-4">
                <a-menu-item
                  v-for="(imotion, index) in imotions"
                  :key="index"
                  @click="handleChangeImotion(imotion)"
                  class=""
                >
                  <img
                    :src="data2.getEmotionUrl(imotion)"
                    alt="imotion"
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
              @click="data2.hiddenDetailEntry()"
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

  <!-- New entry button -->
  <div
    class="new-entry-btn flex lg:hidden z-10"
    :class="{ hidden: data2.isShowDetail }"
    @click="createNewEntry"
  >
    <plus-outlined class="rotate-45" />
  </div>
</template>

<style scoped lang="scss">
.imotion-icon {
  padding: 5px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.new-entry-btn {
  position: absolute;
  bottom: 40px;
  right: 40px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: rgba($color: white, $alpha: 0.5);
  transform: rotate(45deg);
  font-size: 22px;
  cursor: pointer;
}
</style>
