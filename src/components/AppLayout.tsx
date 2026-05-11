import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Users, Briefcase, LogOut, Scale, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { toast } from "sonner";
import sidebarMascot from "@/assets/sidebar-mascot.png";

const navItems = [
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/advogados", label: "Advogados", icon: Briefcase },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logout realizado.");
    navigate("/");
  };

  const SidebarContents = ({ onNavigate, showMascot = false }: { onNavigate?: () => void; showMascot?: boolean }) => (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <Scale className="h-7 w-7 text-sidebar-primary" />
        <span className="text-lg font-bold text-sidebar-accent-foreground tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          JurisGestão
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      {showMascot && (
        <div className="p-4 flex justify-center">
          <img src={sidebarMascot} alt="Mascote" className="w-40 h-auto select-none pointer-events-none" />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0">
        <SidebarContents />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
          <SidebarContents onNavigate={() => setMobileOpen(false)} showMascot />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 shrink-0 gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="md:hidden flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                JurisGestão
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Dr. Carlos Mendes</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;