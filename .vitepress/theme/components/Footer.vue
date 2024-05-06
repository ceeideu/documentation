<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <section>
      <a href="/unsubscribe">Usuń swój e-mail z bazy PIR</a>
      <a href="/polityka-prywatnosci">Polityka prywatności</a>
      <p>COPYRIGHT &copy; {{ year }} WIRTUALNA POLSKA S.A.</p>
    </section>
    <img src="/logo.svg"
         alt="Logo"
         class="logo" />
  </footer>
</template>

<style scoped>
  @import "../styles/breakpoints.css";
  @import "../styles/mixins.css";

  footer {
    @mixin text-color-light;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    color: var(--vp-c-text-1);
    background-color: var(--vp-c-brand-1);
    padding: 1.25rem;

    height: 15rem;

    position: relative;
    overflow: hidden;
    z-index: 25;

    & > section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      width: 100%;
      max-width: var(--content-width);

      position: relative;
      z-index: 1;
    }

    & > .logo {
      height: 110%;
      position: absolute;
      bottom: -1rem;
      right: 25%;
      filter: brightness(110%) saturate(0) contrast(250%);
      opacity: .1;

      @media (max-width: var(--breakpoint-md)) {
        right: 10%;
      }
    }
  }
</style>
