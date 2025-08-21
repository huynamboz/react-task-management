import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { useProjectStore, type UserStory } from "@/store";
import { axiosClient } from "@/shared/query-client";
import { useMutation } from "@tanstack/react-query";

interface AddUserStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  title: string;
  description: string;
  acceptanceCriteria: string;
  priority: "low" | "medium" | "high";
  storyPoints: string;
  productOwner: string;
  sprintId: string;
  tags: string;
};

export const AddUserStoryModal = ({ isOpen, onClose }: AddUserStoryModalProps) => {
  const createUserStory = useMutation({
    mutationFn: async (userStory: Omit<UserStory, 'id'>) => {
      const response = await axiosClient.post('/user-stories', userStory);
      return response.data;
    },
  }); 
  const { sprints } = useProjectStore();
  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      acceptanceCriteria: "",
      priority: "medium",
      storyPoints: "",
      productOwner: "",
      sprintId: "",
      tags: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.title || !data.description) return;

    const newUserStory = {
      id: `us${Date.now()}`,
      sprintId: data.sprintId || "backlog",
      title: data.title,
      description: data.description,
      priority: data.priority,
      points: parseInt(data.storyPoints) || 0,
      creator: data.productOwner || "Unknown",
    };

    await createUserStory.mutateAsync(newUserStory);

    reset();
    onClose();
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
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storyPoints">Story Points</Label>
              <Controller
                name="storyPoints"
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

          {/* Product Owner and Sprint */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productOwner">Product Owner</Label>
              <Controller
                name="productOwner"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

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
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Add a tag..."
              {...register("tags")}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create User Story</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
