# Contributing
Below you'll find a set of guidelines for how to contribute to this documentation.

### Technologies used
All the documentation is written in Markdown.
To generate a static website based on these files, we are using [VitePress](https://vitepress.dev/) with few customizations.

### Installation
#### Prerequisites
- Node.js version 18 or higher.
- Terminal for accessing VitePress via its command line interface (CLI).
- Text Editor with Markdown syntax support.

#### Source Files
Markdown files in the `docs` directory are considered source files.

VitePress uses file-based routing: each .md file is compiled into a corresponding .html file with the same path.
For example, index.md will be compiled into index.html, and can be visited at the root path / of the resulting VitePress site.

Files located directly in the `docs` directory are top level pages and they are not related to any specific docs version.
Files in subdirectories are related to a specific version of the documentation.
**Names of subdirectories must follow the [Semantic Versioning (SemVer)](https://semver.org/) format, for example `1.0.0`.**
The latest version of the documentation will be used as the default version (beta releases are excluded).

In each directory, there should be an `sidebar.json` file which contains the sidebar structure for that version of the documentation.
The sidebar structure is a JSON object that maps to the sidebar structure of the VitePress site (https://vitepress.dev/reference/default-theme-sidebar).
The first position in the sidebar is treated as the main page of the documentation.

#### VitePress
All of the VitePress config files and frontend files are located in the `.vitepress` directory.
Usually, you don't need to touch these files unless you want to customize the VitePress theme or add some custom components.

### Development
When developing, you can use all of the VitePress features:
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Frontmatter](https://vitepress.dev/guide/frontmatter)
- [Vue Components](https://vitepress.dev/guide/using-vue)

Asset Handling is described [here](https://vitepress.dev/guide/asset-handling).

#### Links
When linking to the latest version of the documentation, use `/latest`, which will be replaced with the current version at build time. It can be followed by a relative path to the file you want to link to (e.g. `/latest/guide.md`).


### Up and Running
All of the following commands should be run in the root directory of the project.

First of all, install all dependencies:
```bash
npm install
```
Now you can start the development server:
```bash
npm run docs:dev
```
The dev server should be running at http://localhost:5173. From now every change in source files will restart the server.
