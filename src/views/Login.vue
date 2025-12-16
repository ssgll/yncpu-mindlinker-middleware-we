<template>
  <div v-if="loading">
    登录中....
  </div>
  <div v-if="error">
    {{ error }}
  </div>
</template>


<script setup>
import {useLogin} from '@/hook/useLogin.ts'

const {
  loading,
  error
} = useLogin()
</script>