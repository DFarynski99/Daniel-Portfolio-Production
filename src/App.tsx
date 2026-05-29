import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editorial from "./concepts/Editorial";
import ProjectDarkPage from "./concepts/ProjectDarkPage";
import CaseStudyPage from "./concepts/CaseStudyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editorial />} />
          <Route path="/project-dark" element={<ProjectDarkPage />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<Editorial />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
