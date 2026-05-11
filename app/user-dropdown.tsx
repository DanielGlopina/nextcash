'use client';

import { UserButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDropdown() {
   const router = useRouter();
   const [showName, setShowName] = useState(false);

   useEffect(() => {
      const mq = window.matchMedia("(min-width: 640px)");
      const sync = () => setShowName(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
   }, []);

   return (
      <UserButton showName={showName} appearance={
         {
            elements: {
               userButtonOuterIdentifier: {
                  color: 'white'
               }
            }
         }
      }>
         <UserButton.MenuItems>
            <UserButton.Action label="Dashboard" labelIcon={<ChartColumnBigIcon size={16} />}
               onClick={() => {
                  router.push('/dashboard')
               }} />
         </UserButton.MenuItems>
      </UserButton>
   )
}