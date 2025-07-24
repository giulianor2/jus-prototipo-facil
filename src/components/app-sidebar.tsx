import {
  Calendar,
  FileText,
  Users,
  Settings,
  LogOut,
  Scale,
  Gavel,
  BookOpen
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: FileText },
  { title: "Atendimentos", url: "/atendimentos", icon: Users },
  { title: "Processos", url: "/processos", icon: Gavel },
  { title: "Agendamentos", url: "/agendamentos", icon: Calendar },
  { title: "Biblioteca", url: "/biblioteca", icon: BookOpen },
];

const systemItems = [
  { title: "Configurações", url: "/configuracoes", icon: Settings },
  { title: "Sair", url: "/logout", icon: LogOut },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-primary">NPJ</h2>
                <p className="text-xs text-muted-foreground">Núcleo de Práticas Jurídicas</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sistema */}
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}