import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { fetchProjects } from '../api/projectsApi';

const toast = useToast();

export const useProjects = defineStore('projects', {
  state: () => ({
    projects: [],
    projectsState: 'idle',
  }),
  actions: {
    setProjectsState(newState) {
      this.projectsState = newState;
    },
    setProjects(projects) {
      this.projects = projects;
    },
    async fetchProjects() {
      this.setProjectsState('error');
      try {
        const response = await fetchProjects();
        this.setProjects(response);
        this.setProjectsState('success');
      } catch (error) {
        this.setProjectsState('error');
        toast.error("Ошибка при загрузке проектов.");
      }
    },
  },
});
