import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PageContainer from "@/components/page-container";

function Layout({ children }: { children: ReactNode }) {
   return <PageContainer className="py-6 sm:py-10">
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/dashboard">
                     Dashboard
                  </Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/dashboard/transactions">Transactions</Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>Edit Transaction</BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
      {children}
   </PageContainer>
}

export default Layout;