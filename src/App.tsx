import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Conferences from "./pages/church-structure/Conferences";
import ConferenceDetails from "./pages/church-structure/ConferenceDetails";
import Districts from "./pages/church-structure/Districts";
import DistrictDetails from "./pages/church-structure/DistrictDetails";
import Societies from "./pages/church-structure/Societies";
import Clergy from "./pages/members/Clergy";
import ClergyDetails from "./pages/members/ClergyDetails";
import LayOfficers from "./pages/members/LayOfficers";
import LayOfficerDetails from "./pages/members/LayOfficerDetails";
import Staff from "./pages/members/Staff";
import StaffDetails from "./pages/members/StaffDetails";
import Collections from "./pages/finance/Collections";
import Payments from "./pages/finance/Payments";
import FinanceReports from "./pages/finance/FinanceReports";
import HR from "./pages/administration/HR";
import Memos from "./pages/administration/Memos";
import Documents from "./pages/administration/Documents";
import BulkSMS from "./pages/administration/BulkSMS";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/church-structure/conferences" element={<Conferences />} />
          <Route path="/church-structure/conferences/:id" element={<ConferenceDetails />} />
          <Route path="/church-structure/districts" element={<Districts />} />
          <Route path="/church-structure/districts/:id" element={<DistrictDetails />} />
          <Route path="/church-structure/societies" element={<Societies />} />
          <Route path="/members/clergy" element={<Clergy />} />
          <Route path="/members/clergy/:id" element={<ClergyDetails />} />
          <Route path="/members/lay-officers" element={<LayOfficers />} />
          <Route path="/members/lay-officers/:id" element={<LayOfficerDetails />} />
          <Route path="/members/staff" element={<Staff />} />
          <Route path="/members/staff/:id" element={<StaffDetails />} />
          <Route path="/finance/collections" element={<Collections />} />
          <Route path="/finance/payments" element={<Payments />} />
          <Route path="/finance/reports" element={<FinanceReports />} />
          <Route path="/administration/hr" element={<HR />} />
          <Route path="/administration/memos" element={<Memos />} />
          <Route path="/administration/documents" element={<Documents />} />
          <Route path="/administration/bulk-sms" element={<BulkSMS />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
