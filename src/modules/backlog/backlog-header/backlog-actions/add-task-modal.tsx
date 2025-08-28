import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { useBacklogListDispatch, useBacklogListState } from "@/modules/backlog/backlog-store";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { priorityOptions } from "./add-user-story-modal";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStoryId?: string; // Optional: pre-select a user story
}

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  assignee: string;
  sprintId: string;
  userStoryId: string;
  tags: string;
};

export const AddTaskModal = ({ isOpen, onClose, userStoryId }: AddTaskModalProps) => {
  const dispatch = useBacklogListDispatch();
  const { sprints, userStories } = useBacklogListState();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      assignee: "",
      sprintId: "",
      userStoryId: userStoryId || "",
      tags: "",
    },
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.title || !data.description) return;

    const newTask = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      assignee: data.assignee,
      sprintId: data.sprintId || null,
      userStoryId: data.userStoryId || null,
      tags: tags,
    };

    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      // const response = await axiosClient.post('/tasks', newTask);
      // const { data: tasks } = await axiosClient.get('/tasks');
      
      // Update store with new task
      if (newTask.userStoryId) {
        dispatch({
          type: "ADD_TASK",
          payload: {
            userStoryId: newTask.userStoryId,
            task: {
              id: Date.now().toString(),
              userStoryId: newTask.userStoryId,
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              assignee: newTask.assignee,
            },
          },
        });
      }
      
      reset();
      setTags([]);
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setTags([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Task
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 h-6 w-6 p-0"
            onClick={onClose}
          >
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              {...register("title", { required: true })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the task..."
              className="min-h-[80px]"
              {...register("description", { required: true })}
            />
          </div>


          {/* Priority and Assignee */}
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
              <Label htmlFor="assignee">Assignee</Label>
              <Controller
                name="assignee"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                      <SelectItem value="Alice Brown">Alice Brown</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Sprint and User Story */}
          <div className="grid grid-cols-2 gap-4">
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
                      {Array.from(sprints.values()).map((sprint) => (
                        <SelectItem key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userStoryId">User Story</Label>
              <Controller
                name="userStoryId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="No User Story" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(userStories.values()).flat().map((userStory) => (
                        <SelectItem key={userStory.id} value={userStory.id}>
                          {userStory.title.length > 30 
                            ? userStory.title.substring(0, 30) + "..." 
                            : userStory.title
                          }
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>


          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              placeholder="dd/mm/yyyy"
              {...register("dueDate")}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
