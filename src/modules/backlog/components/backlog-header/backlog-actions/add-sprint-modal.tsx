import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconCalendar } from "@tabler/icons-react";
import { useProjectStore, type Sprint } from "@/modules/backlog/store";
import { useForm } from "react-hook-form";
import { axiosClient, queryClient } from "@/shared/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface AddSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
};

export const AddSprintModal = ({ isOpen, onClose }: AddSprintModalProps) => {
  const { dispatch } = useProjectStore();

  const createSprint = useMutation({
    mutationFn: async (sprint: Omit<Sprint, 'id'>) => {
      const response = await axiosClient.post('/sprints', sprint);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprints'] });
    },
  });

  const getSprints = useQuery({
    queryKey: ['sprints'],
    queryFn: async () => {
      const response = await axiosClient.get('/sprints');
      return response.data;
    },
    enabled: false,
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.name || !data.startDate || !data.endDate) return;

    const newSprint = {
      name: data.name,
      startDate: data.startDate,
      goal: data.goal,
      endDate: data.endDate,
      userStoryTotal: 0,
    };

    try {
      await createSprint.mutateAsync(newSprint);
      const result = await getSprints.refetch();
      if (result.data) {
        dispatch({
          type: 'SET_SPRINTS',
          payload: result.data
        });
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create sprint:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Sprint
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 h-6 w-6 p-0"
            onClick={onClose}
          />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sprint Name */}
          <div className="space-y-2">
            <Label htmlFor="sprint-name">Sprint Name</Label>
            <Input
              id="sprint-name"
              placeholder="Enter sprint name..."
              {...register("name", { required: true })}
            />
          </div>

          {/* Sprint Goal */}
          <div className="space-y-2">
            <Label htmlFor="sprint-goal">Sprint Goal</Label>
            <Textarea
              id="sprint-goal"
              placeholder="What do you want to achieve in this sprint?"
              className="min-h-[80px] resize-none"
              {...register("goal")}
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <Input
                  id="start-date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  {...register("startDate", { required: true })}
                />
                <IconCalendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="relative">
                <Input
                  id="end-date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  {...register("endDate", { required: true })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={createSprint.isPending}>
              {createSprint.isPending ? 'Creating...' : 'Create Sprint'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
