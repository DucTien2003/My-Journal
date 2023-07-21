<script setup lang="ts">
import HeaderComp from "../components/HeaderComp.vue";
</script>

<template>
  <div class="background min-h-screen">
    <header-comp></header-comp>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
