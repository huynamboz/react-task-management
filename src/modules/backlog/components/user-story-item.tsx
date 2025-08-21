import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { IconBook } from "@tabler/icons-react";
import { GripVertical, Target } from "lucide-react";
import type { Task, UserStory } from "@/store/types";
import { useProjectStore } from "@/store";

type UserStoryItemProps = {
  userStory: UserStory
};
export const UserStoryItem = ({ userStory }: UserStoryItemProps) => {
  const { tasks } = useProjectStore();
  const tasksByUserStoryId = tasks.get(userStory.id) || [];

  return (
    <div draggable className="group border rounded-2xl shadow-sm bg-white">
      <div className="flex items-center gap-2 border-l-3 rounded-tl-2xl rounded-bl-2xl p-4 border-gray-200 pr-4">
        <div className="opacity-0 group-hover:opacity-100 cursor-move">
          <GripVertical size={16} color="gray" />
        </div>

        <div className="py-2 w-full">
          {/* Header Section */}
          <div className="flex items-center gap-3">
            <IconBook className="w-5 h-5 text-gray-600" />
            <Badge
              variant="secondary"
              className={`hover:bg-orange-100 ${
                userStory.priorityId === 'high'
                  ? 'bg-red-100 text-red-800'
                  : userStory.priorityId === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {userStory.priorityId}
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              {userStory.point} pts
            </Badge>
          </div>

          {/* Main User Story */}
          <div className="space-y-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {userStory.title}
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                {userStory.description}
              </p>
            </div>

            <div className="flex items-center text-sm gap-4 text-gray-600">
              {/* <span>{userStory.assignee}</span> */}
              <span>{tasksByUserStoryId.length} tasks</span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-8 border-b pb-5">
              {/* {userStory.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-600 border-gray-300"
                >
                  {tag}
                </Badge>
              ))} */}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-4 h-4" />
              <h2 className="text-sm font-medium">Tasks ({tasksByUserStoryId.length})</h2>
            </div>

            <div className="space-y-2 pl-4">
              {/* Task 1 */}
              {/* <Card draggable className="border border-gray-200">
                <CardHeader className="pb-1 text-sm px-1">
                  <div className="flex items-center gap-2">
                    <GripVertical className="size-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Implement JWT authentication
                      </h3>
                      <p className="text-xs text-gray-600">
                        Add JWT token-based authentication system
                      </p>
                      <div className=" mt-2 flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                        >
                          high
                        </Badge>
                        <span className="text-xs text-gray-600">John Doe</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card> */}

              {tasksByUserStoryId.map((task: Task) => (
                <Card
                  key={task.id}
                  draggable
                  className="border border-gray-200"
                >
                  <CardHeader className="pb-1 text-sm px-1">
                    <div className="flex items-center gap-2">
                      <GripVertical className="size-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {task.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className={`${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                : 'bg-green-100 text-green-800 hover:bg-green-100'
                            }`}
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-gray-600">{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
