<script lang="ts" setup>
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue';
import { useData } from 'vitepress';
import { reactive, ref, watch } from 'vue';

const { theme, page } = useData();
const config = theme.value.versionSwitcher;

const latestVersion = ref(config.latestVersion);
const versions = config.versions.map((item) => item.text);

watch(() => page.value.relativePath, (path) => {
  const matchedVersion = versions.find((version) => path.startsWith(version));
  if (!matchedVersion) return;
  latestVersion.value = matchedVersion;
}, { immediate: true });

const item = reactive({
  text: latestVersion,
  items: [
    {
      text: 'Versions',
      items: config.versions,
    }
  ],
});

</script>

<template>
  <VPNavBarMenuGroup :item="item" />
</template>
