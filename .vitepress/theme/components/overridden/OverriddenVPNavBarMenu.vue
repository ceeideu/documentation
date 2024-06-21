<!-- Custom component forked from Vitepress 1.1.3 (vitepress/dist/client/theme-default/components/VPNavBarMenu.vue) -->
<script lang="ts" setup>
import { useData } from 'vitepress';
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue';
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue';
import VersionSwitcher from '../../../version-switcher/VersionSwitcher.vue';

const { theme } = useData();
</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in theme.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
    <VersionSwitcher />
  </nav>
</template>

<style lang="scss" scoped>
.VPNavBarMenu {
  @apply hidden md:flex;
}
</style>
