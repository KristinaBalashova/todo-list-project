import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { fetchProjects } from '../api/projectsApi';

const toast = useToast();

export const useProjects = defineStore('projects', {
  state: () => ({
    projects: [],
    projectsState: 'IDLE',
  }),
  actions: {
    setProjectsState(newState) {
      this.projectsState = newState;
    },
    setProjects(projects) {
      this.projects = projects;
    },
    async fetchProjects() {
      this.setProjectsState('LOADING');
      try {
        const response = await fetchProjects();
        this.setProjects(response);
        this.setProjectsState('SUCCESS');
      } catch (error) {
        this.setProjectsState('ERROR');
        toast.error("Ошибка при загрузке проектов.");
      }
    },
  },
});
