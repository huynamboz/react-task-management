import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { useProjectStore, type UserStory } from "@/modules/backlog/store";
import { axiosClient } from "@/shared/query-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AddUserStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const priorityOptions = [
  {
      "id": "ecfeb151-8c79-4a2f-8c1f-a861798ad956",
      "businessId": "US-001",
      "name": "Low",
      "level": 0
  },
  {
      "id": "41f77833-5c96-448d-8dd9-34b30a0ea940",
      "businessId": "US-001",
      "name": "Medium",
      "level": 1
  },
  {
      "id": "60fea3ca-b021-40ff-aa37-312acc15c389",
      "businessId": "US-001",
      "name": "High",
      "level": 2
  }
]
type FormValues = {
  title: string;
  description: string;
  acceptanceCriteria: string;
  priorityId: string;
  point: string;
  sprintId: string;
  tags: string;
};

export const AddUserStoryModal = ({ isOpen, onClose }: AddUserStoryModalProps) => {
  const queryClient = useQueryClient();
  const { dispatch, sprints } = useProjectStore();
  const { refetch: refetchUserStories } = useQuery({
    queryKey: ['userStories'],
    queryFn: () => axiosClient.get(`/user-stories`),
    enabled: false,
  });

  const createUserStory = useMutation({
    mutationFn: async (userStory: {
      title: string;
      description: string;
      priorityId: string;
      point: number;
      sprintId: string | null;
      tags: string[];
    }) => {
      const response = await axiosClient.post('/user-stories', userStory);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch user stories after creating
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
    },
  }); 
  
  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      acceptanceCriteria: "",
      priorityId: "medium",
      point: "",
      sprintId: "",
      tags: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.title || !data.description) return;

    const newUserStory = {
      title: data.title,
      description: data.description,
      priorityId: data.priorityId,
      point: parseInt(data.point) || 0,
      sprintId: data.sprintId || null,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
    };

    try {
      await createUserStory.mutateAsync(newUserStory);
      const { data: userStories } = await refetchUserStories();
      dispatch({
        type: "SET_USER_STORIES_BY_SPRINT_ID",
        payload: {
          sprintId: newUserStory.sprintId || '',
          userStories: (userStories?.data as UserStory[]).filter(us => us.sprintId === newUserStory.sprintId),
        },
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create user story:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New User Story
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 h-6 w-6 p-0"
            onClick={onClose}
          />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* User Story Title */}
          <div className="space-y-2">
            <Label htmlFor="title">User Story Title</Label>
            <Input
              id="title"
              placeholder="As a [user], I want [goal] so that [benefit]..."
              {...register("title", { required: true })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the user story..."
              className="min-h-[80px]"
              {...register("description", { required: true })}
            />
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
            <Textarea
              id="acceptanceCriteria"
              placeholder="Given [context], when [action], then [outcome]..."
              className="min-h-[80px]"
              {...register("acceptanceCriteria")}
            />
          </div>

          {/* Priority and Story Points */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priorityId">Priority</Label>
              <Controller
                name="priorityId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((priority) => (
                        <SelectItem key={priority.id} value={priority.id}>
                          {priority.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="point">Story Points</Label>
              <Controller
                name="point"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select points" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="13">13</SelectItem>
                      <SelectItem value="21">21</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Sprint Selection */}
          <div className="space-y-2">
            <Label htmlFor="sprintId">Sprint</Label>
            <Controller
              name="sprintId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Backlog (No Sprint)" />
                  </SelectTrigger>
                  <SelectContent>
                    {sprints.map((sprint) => (
                      <SelectItem key={sprint.id} value={sprint.id}>
                        {sprint.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="authentication, frontend, urgent (comma separated)"
              {...register("tags")}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={createUserStory.isPending}>
              {createUserStory.isPending ? 'Creating...' : 'Create User Story'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
