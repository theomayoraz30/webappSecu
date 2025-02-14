<script lang="ts" setup>
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';
import DashboardFooter from '@/components/dashboard/DashboardFooter.vue';
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <DashboardNavbar />
    </header>

    <main class="col">
      <router-view />
    </main>

    <footer>
      <DashboardFooter />
    </footer>
  </div>
</template>
