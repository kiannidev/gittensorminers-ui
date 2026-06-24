import { NavLink, Outlet } from 'react-router-dom';
import { Database, HelpCircle, LayoutDashboard, Pickaxe } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useRealtimeData } from '@/hooks/useRealtimeData';

export function Layout() {
  const { data, lastSyncedAt } = useRealtimeData();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header prices={data.prices} />
      <nav className="border-b border-gt-border bg-gt-surface/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2">
          <NavItem
            to="/repositories"
            icon={<Database className="h-4 w-4" />}
            label="Repositories"
            count={Array.isArray(data.repos) ? data.repos.length : undefined}
          />
          <NavItem
            to="/miners"
            icon={<Pickaxe className="h-4 w-4" />}
            label="Miners"
            count={data.miners?.length}
          />
          {user && (
            <NavItem to="/my-board" icon={<LayoutDashboard className="h-4 w-4" />} label="My Board" />
          )}
          <NavItem to="/help" icon={<HelpCircle className="h-4 w-4" />} label="Help" />
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet context={{ data, lastSyncedAt }} />
      </main>
      <Footer />
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  count,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link whitespace-nowrap ${isActive ? 'nav-link-active' : ''}`
      }
    >
      {icon}
      {label}
      {count != null && (
        <span className="ml-0.5 rounded-md bg-gt-border/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gt-muted">
          {count}
        </span>
      )}
    </NavLink>
  );
}
