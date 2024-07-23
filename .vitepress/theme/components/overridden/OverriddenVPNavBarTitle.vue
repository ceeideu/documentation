<!-- Custom component forked from Vitepress 1.1.3 (vitepress/dist/client/theme-default/components/VPNavBarMenu.vue) -->
<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js';
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs.js';
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js';
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js';
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';

const { site, theme } = useData();
const { hasSidebar } = useSidebar();
const { currentLang } = useLangs();

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link
);

const rel = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.rel
);

const target = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.target
);

// Hack to make external links work in VitePress.
// VitePress tries to handle the navigation by Vue Router if the domain is the same, even if the destination is outside the VitePress site.
function navigate() {
  const url = link.value ?? normalizeLink(currentLang.value.link);
  if (target.value === '_blank') {
    window.open(url, '_blank');
    return;
  }

  window.location.href = url
}
</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel="rel"
      :target="target"
      @click="navigate"
    >
      <slot name="nav-bar-title-before" />
      <VPImage v-if="theme.logo" class="logo" :image="theme.logo" />
      <template v-if="theme.siteTitle"><span>{{ theme.siteTitle }}</span></template>
      <template v-else-if="theme.siteTitle === undefined"><span>{{ site.title }}</span></template>
      <slot name="nav-bar-title-after" />
    </a>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
