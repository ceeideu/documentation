<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <section class="layout-width-content">
      <a :href="`${$config.homePageUrl}/opt-out`">Opt-out</a>
      <a :href="`${$config.homePageUrl}/privacy-policy`">Privacy policy</a>
      <p>COPYRIGHT &copy; {{ year }} Businessclick Sp. z o.o.</p>
    </section>
    <img src="/logo.svg"
         alt="Logo"
         class="logo" />
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    @apply flex justify-center items-end text-palette-light-text bg-palette-accent p-5 h-60 relative overflow-hidden z-[25];

    & > section {
      @apply flex flex-col gap-1 text-sm relative z-[1];
    }

    & > .logo {
      @apply w-[900px] h-[900px] max-w-[100vw] max-h-[100vw] aspect-square absolute left-[60%] top-[15%] filter brightness-110 saturate-0 contrast-[250] opacity-10 pointer-events-none z-0
    }
  }
</style>
