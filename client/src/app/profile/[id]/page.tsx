'use client'

import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react';

function Page() {
  const {data: session,  status} = useSession()
  const router = useRouter()

 useEffect(() => {
     if (status === "unauthenticated") {
       router.replace("/");
     }
   }, [router, status]);
   
   const { id } = useParams()

  return (
    <div className="text-white">
      <h1>hello {id}</h1>
    </div>
  )
}

export default Page
