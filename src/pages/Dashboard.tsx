import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"

interface Roadmap {
  id: string
  learning_goals: string
  created_at: string
}

function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://44.201.125.113:8000/api/user/roadmaps", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await res.json()
        setRoadmaps(data.roadmaps || [])
      } catch (err) {
        console.error("Failed to fetch roadmaps:", err)
        setRoadmaps([])
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmaps()
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full bg-black min-h-screen text-white px-4 py-6 sm:px-6 md:ml-72">
        <h1 className="text-2xl font-bold mb-6">Your Learnings,</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : roadmaps.length === 0 ? (
          <p className="text-gray-400">No roadmaps found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmaps.map((rm) => (
              <Link
                key={rm.id}
                to={`/roadmap/${rm.id}`}
                className="border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg hover:bg-gray-800 transition-all"
              >
                <h2 className="text-lg font-semibold text-blue-400 mb-2">
                  {toTitleCase(rm.learning_goals)}
                </h2>
                <p className="text-sm text-gray-400">
                  Created: {new Date(rm.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
