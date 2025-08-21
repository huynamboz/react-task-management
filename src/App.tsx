import { Routes, Route } from "react-router-dom";
import {MainLayout} from "@/layouts/main-layout";
import { BacklogPage } from "./modules/backlog/backlog-page";
import { SprintDetailPage } from "./modules/sprints/sprint-detail-page";
import { TimelinePage } from "./modules/timelines/timeline-page";
import { ProjectProvider } from "./store";
import { QueryProvider } from "./shared/query-provider";

function App() {
  return (
    <QueryProvider>
      <ProjectProvider>
        <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BacklogPage />} />
          <Route path="/sprints" element={<SprintDetailPage />} />
          <Route path="/timelines" element={<TimelinePage />} />
        </Route>
      </Routes>
      </ProjectProvider>
    </QueryProvider>
  );
}

export default App;
