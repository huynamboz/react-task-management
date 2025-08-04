import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const Sidebar = ({
  isCollapsed,
  toggleSidebar
}: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={`${isCollapsed ? 'w-12' : 'w-64'} flex flex-col justify-between bg-gray-50 h-full text-gray-900 transition-all duration-200 ease-linear relative border-gray-200`}>
     <div>
       {/* Header */}
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5v11M12 5v6M18 5v14" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">TaskFlow</span>
                <span className="truncate text-xs text-gray-500">Project Management</span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-200 h-px w-full"></div>
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
        {/* Navigation Group */}
        <div className="relative flex w-full min-w-0 flex-col p-2">
          {!isCollapsed && (
            <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-gray-500">
              Navigation
            </div>
          )}
          <div className="w-full text-sm">
            <ul className="flex w-full min-w-0 flex-col gap-1">
              <li className="group/menu-item relative">
                <Link to="/" className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-colors hover:bg-gray-100 h-8 text-sm ${location.pathname === '/' ? 'bg-gray-100 font-medium' : ''}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13" />
                  </svg>
                  {!isCollapsed && <span className="flex-1 truncate">Backlog</span>}
                  {!isCollapsed && (
                    <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 text-gray-700 ml-auto h-5 px-1.5 text-xs font-medium">
                      12
                    </span>
                  )}
                </Link>
              </li>
              <li className="group/menu-item relative">
                <Link to="/sprints" className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-colors hover:bg-gray-100 h-8 text-sm ${location.pathname === '/sprints' ? 'bg-gray-100 font-medium' : ''}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5v11M12 5v6M18 5v14" />
                  </svg>
                  {!isCollapsed && <span className="flex-1 truncate">Active Sprint</span>}
                  {!isCollapsed && (
                    <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 text-gray-700 ml-auto h-5 px-1.5 text-xs font-medium">
                      8
                    </span>
                  )}
                </Link>
              </li>
              <li className="group/menu-item relative">
                <Link to="/timeline" className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-colors hover:bg-gray-100 h-8 text-sm ${location.pathname === '/timeline' ? 'bg-gray-100 font-medium' : ''}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M3 4h18v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4zM3 10h18" />
                  </svg>
                  {!isCollapsed && <span className="flex-1 truncate">Timeline</span>}
                  {!isCollapsed && (
                    <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 text-gray-700 ml-auto h-5 px-1.5 text-xs font-medium">
                      3
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats Group */}
        {!isCollapsed && (
          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-gray-500">
              Quick Stats
            </div>
            <div className="w-full text-sm">
              <div className="space-y-2 px-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Tasks</span>
                  <span className="font-medium">20</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">In Progress</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Due Soon</span>
                  <span className="font-medium text-orange-600">3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Group */}
        {!isCollapsed && (
          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-gray-500">
              Recent Activity
            </div>
            <div className="w-full text-sm">
              <div className="space-y-2 px-2">
                <div className="text-xs text-gray-500">
                  <div className="flex items-center gap-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="truncate">Task completed</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="truncate">Sprint started</span>
                  </div>
                  <div className="flex items-center gap-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <span className="truncate">New task assigned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
     </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 p-2">
        <ul className="flex w-full min-w-0 flex-col gap-1">
          <li className="group/menu-item relative">
            <button className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-colors hover:bg-gray-100 h-12 text-sm">
              <div className="relative flex size-8 shrink-0 overflow-hidden h-8 w-8 rounded-lg bg-gray-300">
                <span className="flex items-center justify-center w-full h-full text-gray-700 text-sm font-medium">JD</span>
              </div>
              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">John Doe</span>
                  <span className="truncate text-xs text-gray-500">john@example.com</span>
                </div>
              )}
              {!isCollapsed && (
                <svg className="ml-auto size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Toggle Rail */}
      <button
        onClick={toggleSidebar}
        className="absolute inset-y-0 z-20 w-1 -right-0 border-r transition-all ease-linear hover:border-r-2 hover:cursor-w-resize"
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar"
      >
      </button>
    </aside>
  );
}