import DashboardLayout from "@/app/components/ui/dashboard-layout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
        <div>
            <DashboardLayout>
                {children}
            </DashboardLayout>
            
        </div>
    )
}