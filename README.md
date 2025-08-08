# Vue To-Do Application

This project is currently in development and is planned to grow from a simple Todo List into a full Kanban Board.

- The `main` branch contains the Vue 2 + Vuex version of the Todo List.
- The `migration/vue3-composition-api` branch contains the migrated project to Vue 3 Composition API + Pinia, and will continue to be developed further.

Stay tuned!

## Deploy

- Vue2 + Vuex https://todo-list-project-psi.vercel.app/

- Vue3 + Pinia https://todo-list-project-psx6.vercel.app

## Technology Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vue 2](https://img.shields.io/badge/Vue%202-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vuex](https://img.shields.io/badge/Vuex-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vue Toastification](https://img.shields.io/badge/Vue--Toastification-FF5E00?style=for-the-badge&logo=vue.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue%203-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![typescript](https://img.shields.io/npm/v/typescript.svg?style=flat-square)(https://www.npmjs.com/package/typescript)
![Pinia](https://img.shields.io/badge/Pinia-ffd859?style=for-the-badge&logo=pinia&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![vue-draggable-next](https://img.shields.io/npm/v/vue-draggable-next.svg?style=flat-square)(https://www.npmjs.com/package/vue-draggable-next)
![supabase-js](https://img.shields.io/npm/v/@supabase/supabase-js.svg?style=flat-square)(https://www.npmjs.com/package/@supabase/supabase-js)
![vue-i18n](https://img.shields.io/npm/v/vue-i18n.svg?style=flat-square)(https://www.npmjs.com/package/vue-i18n)

## Features

- **Initial Data Loading**: At the start the application fetches the existing tasks from Supabase.
- **Adding Tasks**: Users can add new tasks to the list.
- **Editing**: Tasks can be added and edited - status, executor, project, priority 
- **Sorting**: Tasks are sorted by status (completed/active/all).
- **Drag and drop**: User can toggle todo status (active/in progress/completed).

## Planned Features

- Pagination or List Virtualization in case we have too many todos
- Search
- Auth and registration
- Calendar view 
- Statistics for admin pannel
- Saving drafts for later
etc.


