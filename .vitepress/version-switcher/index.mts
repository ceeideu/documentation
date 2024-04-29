import * as fs from 'node:fs';
import * as path from 'node:path';
import semver from 'semver';
import { DefaultTheme } from 'vitepress';

const rootDir = path.resolve(__dirname, '..', '..');

export function getCurrentVersion(): string {
  const versions = getVersions();
  return semver.maxSatisfying(versions, '*')!;
}

export function getVersionEntrypoint(version: string): string {
  const sidebar = getSidebar(version);

  let entrypoint = '';
  let level: DefaultTheme.SidebarItem[] = sidebar;
  do {
    if (level[0].link) entrypoint = level[0].link;
    level = level[0].items!;
  } while (!entrypoint && level);

  return entrypoint;
}

export function getVersionsSidebars() {
  const versions = getVersions();
  const sidebars: DefaultTheme.SidebarMulti = {
    '/': getSidebar(),
  };
  for (const version of versions) {
    sidebars[`/${version}/`] = getSidebar(version);
  }
  return sidebars;
}

export function getVersionSwitchMenu(): DefaultTheme.NavItem[] {
  const versions = getVersions();
  return versions.map((version) => ({ text: version, link: getVersionEntrypoint(version) }));
}

function getVersions() {
  const versions = fs.readdirSync(path.resolve(rootDir, 'docs'));
  return versions
    .filter((version) => semver.valid(version))
    .sort((a: string, b: string) => semver.compare(b, a));
}

function getSidebar(version: string = ''): DefaultTheme.SidebarItem[] {
  const sidebarJSON = fs.readFileSync(path.resolve(rootDir, 'docs', version, 'sidebar.json'), 'utf-8');
  const sidebar = JSON.parse(sidebarJSON);
  return rewriteLinks(sidebar, version);
}

function rewriteLinks(sidebar: DefaultTheme.SidebarItem[], version: string): DefaultTheme.SidebarItem[] {
  for (const element of sidebar) {
    const versionPrefix = version ? `/${version}` : '';
    if (element.link && !element.link.match(/^https?:\/\//)) {
      element.link = `${versionPrefix}${element.link}`;
    }
    if (element.items) {
      rewriteLinks(element.items, version);
    }
  }

  return sidebar;
}
