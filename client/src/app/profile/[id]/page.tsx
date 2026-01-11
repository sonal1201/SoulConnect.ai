'use client'

import { useParams } from 'next/navigation'

function Page() {
  const { id } = useParams()

  return (
    <div className="text-white">
      <h1>hello {id}</h1>
    </div>
  )
}

export default Page
