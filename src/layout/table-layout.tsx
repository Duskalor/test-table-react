import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export const TableLayour = () => {
  return (
    <section className='container min-h-screen mx-auto'>
      <SidebarProvider>
        <AppSidebar />
        <main className='flex w-full'>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </section>
  );
};
