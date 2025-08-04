import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";

export const BacklogPage = () => {
  return (
    <div className="">
      {/* header */}
      <div className="px-6 flex items-center justify-between mt-1">
        <div>
          <h1 className="text-2xl font-bold">Backlog</h1>
          <p className="mt-2 text-base text-gray-500">
            Manage user stories, sprints and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Create Sprint
          </Button>
          <Button variant="outline" className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Add Task
          </Button>
          <Button className="px-4 py-2rounded-md">
            <IconPlus className="mr-2" />
            Add User Story
          </Button>
        </div>
      </div>

      {/* Filter box */}
      <div className="px-6 mt-4 flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search user stories"
          className="max-w-sm"
        />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="border-b mt-5"></div>
    </div>
  );
};
