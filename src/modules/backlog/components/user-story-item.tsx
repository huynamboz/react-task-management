import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { IconBook } from "@tabler/icons-react";
import { GripVertical, Target } from "lucide-react";

export const UserStoryItem = () => {
  return (
    <div draggable className="group border rounded-2xl shadow-sm bg-white">
      <div className="flex items-center gap-2 border-l-3 rounded-tl-2xl rounded-bl-2xl p-4 border-gray-200 pr-4">
        <div className="opacity-0 group-hover:opacity-100 cursor-move">
          <GripVertical size={16} color="gray" />
        </div>

        <div className="py-2">
          {/* Header Section */}
          <div className="flex items-center gap-3">
            <IconBook className="w-5 h-5 text-gray-600" />
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 hover:bg-orange-100"
            >
              high
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              5 pts
            </Badge>
          </div>

          {/* Main User Story */}
          <div className="space-y-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                As a user, I want to log into the system so that I can access my
                dashboard
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                Users need a secure way to authenticate and access their
                personalized dashboard
              </p>
            </div>

            <div className="flex items-center text-sm gap-4 text-gray-600">
              <span>John Doe</span>
              <span>2 tasks</span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-8 border-b pb-5">
              <Badge
                variant="outline"
                className="text-gray-600 border-gray-300"
              >
                authentication
              </Badge>
              <Badge
                variant="outline"
                className="text-gray-600 border-gray-300"
              >
                security
              </Badge>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-4 h-4" />
              <h2 className="text-sm font-medium">Tasks (2)</h2>
            </div>

            <div className="space-y-2 pl-4">
              {/* Task 1 */}
              <Card draggable className="border border-gray-200">
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
              </Card>

              {/* Task 2 */}
              <Card draggable className="border border-gray-200">
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
