# Vue To-Do Application

This project is currently in development and is planned to grow from a simple Todo List into a full Kanban Board.

- The `main` branch contains the Vue 2 + Vuex version of the Todo List.
- The `migration/vue3-composition-api` branch contains the migrated project to Vue 3 Composition API + Pinia, and will continue to be developed further.

Stay tuned!

## Deploy

https://todo-list-project-psi.vercel.app/

## Technology Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vue 2](https://img.shields.io/badge/Vue%202-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vuex](https://img.shields.io/badge/Vuex-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vue Toastification](https://img.shields.io/badge/Vue--Toastification-FF5E00?style=for-the-badge&logo=vue.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue%203-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-ffd859?style=for-the-badge&logo=pinia&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

## Features

- **Initial Data Loading**: At the start the application fetches the first 5 tasks from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/users/1/todos).
- **Adding Tasks**: Users can add new tasks to the list.
- **Editing**: Tasks can be edited
- **Sorting**: Tasks can be sorted by status (completed/active/all).
- **Status Update**: User can toggle todo status (active/completed).
- **Delete Completed**: User can delete all completed todos.
- **Active Task Counter**: The current count of active tasks is displayed.

## Planned Features

- Pagination or List Virtualization in case we have too many todos
- Routing
- Drag&Drop for displaying active and inactive todos
- Search
