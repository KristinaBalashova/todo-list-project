import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { fetchProjects } from '../api/projectsApi';
import { Project, Projects } from '../types/projects';
import { STATE, LoadingState } from '../types/common';

const toast = useToast();

export const useProjects = defineStore('projects', {
  state: () => ({
    projects: [] as Projects,
    projectsState: STATE.IDLE as LoadingState,
  }),

  getters: {
    projectById: (state) => (project_id: string) =>
      state.projects.find((p: Project) => p.id === project_id),
  },

  actions: {
    setProjectsState(newState: LoadingState) {
      this.projectsState = newState;
    },

    setProjects(projects: Projects) {
      this.projects = projects;
    },

    async fetchProjects() {
      this.setProjectsState(STATE.LOADING);
      try {
        const response: Projects = await fetchProjects();
        this.setProjects(response);
        this.setProjectsState(STATE.SUCCESS);
      } catch (error) {
        this.setProjectsState(STATE.ERROR);
        toast.error('Ошибка при загрузке проектов.');
      }
    },
  },
});
