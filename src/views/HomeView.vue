<script lang="ts" setup>
import { getToken } from '@/scripts/utils/auth';

const token = getToken();
</script>

<template>
<p>Token: {{ token }}</p>
</template>
