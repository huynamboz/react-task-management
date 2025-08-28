import { apiClient } from "@/shared/apiClient";

interface UserStoryApiClient {
  getAll(): Promise<UserStoryResponse[]>;
  create(userStory: Omit<UserStoryResponse, 'id'>): Promise<UserStoryResponse>;
}

export type UserStoryResponse = {
  id: string;
  title: string;
  description: string;
  priorityId: string;
  point: number;
  sprintId: string | null;
  tags: string[];
};

export const userStoryApiClient: UserStoryApiClient = {
  getAll: async () => {
    const { data } = await apiClient.get<UserStoryResponse[]>('/user-stories');
    return data;
  },
  create: async (userStory: Omit<UserStoryResponse, 'id'>) => {
    const { data } = await apiClient.post<UserStoryResponse>('/user-stories', userStory);
    return data;
  },
};