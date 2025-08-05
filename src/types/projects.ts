
interface Project {
  id: string;
  name: string;
  description: string;
  status?: boolean; 
  owner: string;
  createdAt: string;
  updatedAt: string;  
}

type Projects = Project[];

export { Project, Projects };