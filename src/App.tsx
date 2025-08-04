// App.jsx
import { Routes, Route } from "react-router-dom";
import {MainLayout} from "@/layouts/main-layout";
import { BacklogPage } from "./modules/backlog/backlog-page";
import { SprintDetailPage } from "./modules/sprints/sprint-detail-page";
import { TimelinePage } from "./modules/timelines/timeline-page";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BacklogPage />} />
        <Route path="/sprints" element={<SprintDetailPage />} />
        <Route path="/timelines" element={<TimelinePage />} />
      </Route>
    </Routes>
  );
}

export default App;
