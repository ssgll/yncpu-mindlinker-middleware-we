<script setup lang="ts">
import {useCallback} from "@/hook/useCallback.ts"

const {
  errorMessage, status, msg
} = useCallback()
</script>

<template>
  <div class="">
    <div class="" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="" v-if="status">
      {{ msg }}
    </div>
  </div>
</template>

<style scoped>

</style>