import React from 'react';
import { useUserStories, useCreateUserStory } from '@/modules/backlog/hooks/use-api';
import type { UserStory } from '@/modules/backlog/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ExampleQueryComponent: React.FC = () => {
  const { data: userStories, isLoading, error } = useUserStories();
  const createUserStory = useCreateUserStory();

  const handleCreate = async () => {
    try {
      await createUserStory.mutateAsync({
        title: 'New User Story',
        description: 'Created with React Query',
        priority: 'medium',
        status: 'todo',
      });
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Stories</h2>
        <Button 
          onClick={handleCreate}
          disabled={createUserStory.isPending}
        >
          {createUserStory.isPending ? 'Creating...' : 'Create Story'}
        </Button>
      </div>

      {userStories?.map((story: UserStory) => (
        <Card key={story.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span>{story.title}</span>
              <Badge>{story.priority}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{story.description}</p>
            <Badge variant="outline" className="mt-2">{story.status}</Badge>
          </CardContent>
        </Card>
      ))}

      {userStories?.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No user stories found.
          </CardContent>
        </Card>
      )}
    </div>
  );
};
