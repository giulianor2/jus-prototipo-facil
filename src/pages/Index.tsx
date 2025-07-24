import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { StatisticsCards } from "@/components/statistics-cards";
import { AppointmentsTable } from "@/components/appointments-table";
import { CalendarSection } from "@/components/calendar-section";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">U</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Statistics Cards */}
            <StatisticsCards />
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Calendar and Appointments - Left Side */}
              <div className="lg:col-span-1">
                <CalendarSection />
              </div>
              
              {/* Appointments Table - Right Side */}
              <div className="lg:col-span-3">
                <AppointmentsTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
