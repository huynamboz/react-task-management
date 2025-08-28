import { apiClient } from "@/shared/apiClient";

export type Sprint = {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  goal: string;
};

interface SprintApiClient {
  getAll(): Promise<Sprint[]>;
  create(sprint: Sprint): Promise<Sprint>;
  update(sprint: Sprint): Promise<Sprint>;
}

export const sprintApiClient: SprintApiClient = {
  getAll: async () => {
    const { data } = await apiClient.get<Sprint[]>('/sprints');
    return data;
  },

  create: async (sprint: Sprint) => {
    const { data } = await apiClient.post<Sprint>('/sprints', sprint);
    return data;
  },

  update: async (sprint: Sprint) => {
    const { data } = await apiClient.put<Sprint>('/sprints', sprint);
    return data;
  },
};