// App.jsx
import { Routes, Route } from "react-router-dom";
import {MainLayout} from "@/layouts/main-layout";
import { BacklogPage } from "./modules/backlog/backlog-page";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BacklogPage />} />
        {/* <Route path="/posts" element={<PostListPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
