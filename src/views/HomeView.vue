<script setup lang="ts">
import { onMounted } from "vue";

import { isDesktop } from "@/utils";
import EntryList from "@/components/entry/EntryList.vue";
import EntryDetail from "@/components/entry/EntryDetail.vue";
import { useEntryStore } from "@/stores";

onMounted(async () => {
  await useEntryStore().fetchEntriesOfYears();
});
</script>

<template>
  <div
    v-if="isDesktop"
    class="py-4 flex h-detail"
  >
    <!-- List entries -->
    <entry-list></entry-list>

    <!-- Detail entry -->
    <entry-detail></entry-detail>
  </div>

  <div
    v-else
    class="py-4 h-detail"
  >
    <!-- List entries -->
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.h-detail {
  height: calc(100vh - 72px);
}
</style>
