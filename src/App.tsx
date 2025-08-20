import { Routes, Route } from "react-router-dom";
import {MainLayout} from "@/layouts/main-layout";
import { BacklogPage } from "./modules/backlog/backlog-page";
import { SprintDetailPage } from "./modules/sprints/sprint-detail-page";
import { TimelinePage } from "./modules/timelines/timeline-page";
import { ProjectProvider } from "./store";

function App() {
  return (
    <ProjectProvider>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BacklogPage />} />
        <Route path="/sprints" element={<SprintDetailPage />} />
        <Route path="/timelines" element={<TimelinePage />} />
      </Route>
    </Routes>
    </ProjectProvider>
  );
}

export default App;
