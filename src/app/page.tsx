// src/app/page.tsx
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Candidate Database</h1>
        <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded">
          Admin Dashboard
        </Link>
        <Link href="/recruiter" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Recruiter Dashboard
        </Link>
      </main>
    </div>
  )
}

export default Home
