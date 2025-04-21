
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import SuppliersPage from "./pages/SuppliersPage";
import EventsPage from "./pages/EventsPage";
import UsersPage from "./pages/UsersPage";
import NotFound from "./pages/NotFound";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import { AuthProvider, RequireAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/" 
              element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              } 
            />
            <Route 
              path="/products" 
              element={
                <RequireAuth>
                  <ProductsPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/suppliers" 
              element={
                <RequireAuth>
                  <SuppliersPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/events" 
              element={
                <RequireAuth>
                  <EventsPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/users" 
              element={
                <RequireAuth>
                  <UsersPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/order-tracking" 
              element={
                <RequireAuth>
                  <OrderTrackingPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <RequireAuth>
                  <SettingsPage />
                </RequireAuth>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
