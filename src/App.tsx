import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import {MainLayout} from "@/layouts/main-layout";
import { ProjectProvider } from "./modules/backlog/backlog-store";
import { QueryProvider } from "./shared/query-provider";

const BacklogPage = lazy(() => 
  import("./modules/backlog/backlog-page").then(module => ({ default: module.BacklogPage }))
);
const SprintDetailPage = lazy(() => 
  import("./modules/sprints/sprint-detail-page").then(module => ({ default: module.SprintDetailPage }))
);
const TimelinePage = lazy(() => 
  import("./modules/timelines/timeline-page").then(module => ({ default: module.TimelinePage }))
);

const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <QueryProvider>
      <ProjectProvider>
        <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <Suspense fallback={<PageLoading />}>
              <BacklogPage />
            </Suspense>
          } />
          <Route path="/sprints" element={
            <Suspense fallback={<PageLoading />}>
              <SprintDetailPage />
            </Suspense>
          } />
          <Route path="/timelines" element={
            <Suspense fallback={<PageLoading />}>
              <TimelinePage />
            </Suspense>
          } />
        </Route>
      </Routes>
      </ProjectProvider>
    </QueryProvider>
  );
}

export default App;
