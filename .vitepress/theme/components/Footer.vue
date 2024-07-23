<script lang="ts" setup>
import { useData } from 'vitepress';

const { theme } = useData();
const $config = theme.value;

const year = new Date().getFullYear();

// Hack to make external links work in VitePress.
// VitePress tries to handle the navigation by Vue Router if the domain is the same, even if the destination is outside the VitePress site.
function navigate(url: string, target?: string) {
  if (target === '_blank') {
    window.open(url, '_blank');
    return;
  }

  window.location.href = url;
}

const privacyCenterUrl = `${$config.homePageUrl}/privacy-center`;
const privacyPolicyUrl = 'https://www.businessclick.com/documents/Privacy_Policy.pdf';
</script>

<template>
  <footer>
    <section class="layout-width-content">
      <a :href="privacyCenterUrl"
         @click="navigate(privacyCenterUrl)">
        Privacy center
      </a>
      <a :href="privacyPolicyUrl"
         target="_blank"
         @click="navigate(privacyPolicyUrl, '_blank')"l>
        Privacy policy
      </a>
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
