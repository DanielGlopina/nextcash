import Cashflow from "./cashflow";
import RecentTransactions from "./recent-transactions";
import PageContainer from "@/components/page-container";

async function DashboardPage({
   searchParams
}: {
   searchParams: Promise<{ cfyear: string }>
}) {
   const today = new Date();
   const searchParamsValues = await searchParams;
   let cfYear = Number(searchParamsValues.cfyear ?? today.getFullYear());

   if (isNaN(cfYear)) {
      cfYear = today.getFullYear();
   }

   return (
      <PageContainer size="wide" className="py-6 sm:py-10">
         <h1 className="text-2xl sm:text-4xl font-semibold pb-4 sm:pb-5">
            Dashboard
         </h1>
         <Cashflow year={cfYear} />
         <RecentTransactions />
      </PageContainer>
   );
}

export default DashboardPage;