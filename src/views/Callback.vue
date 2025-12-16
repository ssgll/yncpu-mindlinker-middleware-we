<script setup lang="ts">
import {useCallback} from "@/hook/useCallback.ts"

const {
  errorMessage
} = useCallback()
</script>

<template>
<div class="">
  <div class="" v-if="errorMessage">
    {{ errorMessage }}
  </div>

</div>
</template>

<style scoped>

</style>