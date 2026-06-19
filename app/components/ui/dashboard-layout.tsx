import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/app-sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

  return (
    <SidebarProvider >
      <div className="flex min-h-screen w-full">
            <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger className='hover:none'/>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
