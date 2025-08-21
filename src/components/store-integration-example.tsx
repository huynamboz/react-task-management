import React, { useState } from 'react';
import { useProjectStore, useSyncDataToStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const StoreIntegrationExample = () => {
  const {
    sprints,
    userStories,
    selectedSprint,
    selectedUserStory,
    createUserStory,
    createSprint,
    deleteUserStory,
    selectSprint,
    selectUserStory,
    isLoading,
    errors
  } = useProjectStore();

  // Sync data từ API vào store
  const { isLoading: isSyncing } = useSyncDataToStore();

  // Form states
  const [newSprintName, setNewSprintName] = useState('');
  const [newUserStoryTitle, setNewUserStoryTitle] = useState('');
  const [newUserStoryDescription, setNewUserStoryDescription] = useState('');

  const handleCreateSprint = async () => {
    if (!newSprintName.trim()) return;
    
    try {
      await createSprint({
        name: newSprintName,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        user_story_total: 0
      });
      setNewSprintName('');
    } catch (error) {
      console.error('Failed to create sprint:', error);
    }
  };

  const handleCreateUserStory = async () => {
    if (!newUserStoryTitle.trim() || !selectedSprint) return;
    
    try {
      await createUserStory({
        sprintId: selectedSprint.id,
        title: newUserStoryTitle,
        description: newUserStoryDescription,
        priority: 'medium',
        points: 3,
        creator: 'Current User'
      });
      setNewUserStoryTitle('');
      setNewUserStoryDescription('');
    } catch (error) {
      console.error('Failed to create user story:', error);
    }
  };

  const handleDeleteUserStory = async (sprintId: string, userStoryId: string) => {
    try {
      await deleteUserStory(sprintId, userStoryId);
    } catch (error) {
      console.error('Failed to delete user story:', error);
    }
  };

  if (isSyncing) {
    return <div className="p-4">Loading data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Store Integration Example</h1>
      
      {/* Create Sprint Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Sprint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Sprint name"
              value={newSprintName}
              onChange={(e) => setNewSprintName(e.target.value)}
            />
            <Button 
              onClick={handleCreateSprint}
              disabled={isLoading.createSprint}
            >
              {isLoading.createSprint ? 'Creating...' : 'Create Sprint'}
            </Button>
          </div>
          {errors.createSprint && (
            <p className="text-red-500">Error: {errors.createSprint.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Sprints List */}
      <Card>
        <CardHeader>
          <CardTitle>Sprints ({sprints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedSprint?.id === sprint.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => selectSprint(sprint.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{sprint.name}</h3>
                  <Badge variant="secondary">
                    {sprint.user_story_total} stories
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {sprint.start_date} - {sprint.end_date}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create User Story Section */}
      {selectedSprint && (
        <Card>
          <CardHeader>
            <CardTitle>Create User Story in {selectedSprint.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="User story title"
                value={newUserStoryTitle}
                onChange={(e) => setNewUserStoryTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="User story description"
                value={newUserStoryDescription}
                onChange={(e) => setNewUserStoryDescription(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateUserStory}
              disabled={isLoading.createUserStory}
            >
              {isLoading.createUserStory ? 'Creating...' : 'Create User Story'}
            </Button>
            {errors.createUserStory && (
              <p className="text-red-500">Error: {errors.createUserStory.message}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* User Stories List */}
      {selectedSprint && (
        <Card>
          <CardHeader>
            <CardTitle>User Stories in {selectedSprint.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userStories
                .find(us => us.sprintId === selectedSprint.id)
                ?.stories.map((userStory) => (
                  <div
                    key={userStory.id}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                      selectedUserStory?.id === userStory.id ? 'bg-green-50 border-green-200' : ''
                    }`}
                    onClick={() => selectUserStory(userStory.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{userStory.title}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">{userStory.priority}</Badge>
                        <Badge variant="secondary">{userStory.points} pts</Badge>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUserStory(selectedSprint.id, userStory.id);
                          }}
                          disabled={isLoading.deleteUserStory}
                        >
                          {isLoading.deleteUserStory ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{userStory.description}</p>
                  </div>
                )) || <p className="text-gray-500">No user stories in this sprint</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected User Story Details */}
      {selectedUserStory && (
        <Card>
          <CardHeader>
            <CardTitle>Selected User Story Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Title:</strong> {selectedUserStory.title}</p>
              <p><strong>Description:</strong> {selectedUserStory.description}</p>
              <p><strong>Priority:</strong> {selectedUserStory.priority}</p>
              <p><strong>Points:</strong> {selectedUserStory.points}</p>
              <p><strong>Creator:</strong> {selectedUserStory.creator}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
