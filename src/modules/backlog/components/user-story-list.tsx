export const UserStoryList = () => {
  return (
    <div>
      {/* User stories would go here */}
      <div className="flex flex-col gap-6">
        {/* Example user story item */}
        <div className="border rounded-2xl shadow-sm">
          <div className="border-l-3 rounded-tl-2xl rounded-bl-2xl p-4 border-gray-200 pr-4">
            <h3 className="text-lg font-semibold">User Story Title</h3>
          <p className="text-sm text-gray-600">Description of the user story.</p>
          </div>
        </div>
      </div>
    </div>
  );
}