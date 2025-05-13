import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"

interface ResourceItem {
  topic: string
  resource: string
  hours: number
}

interface RoadmapContent {
  status: string
  message: string
  total_weeks: number
  days_per_week: number
  progress: {
    completed_weeks: number
    total_weeks: number
    percent_complete: number
  }
  roadmap: {
    [week: string]: {
      [day: string]: ResourceItem[]
    }
  }
}

interface RoadmapDetail {
  id: string
  learning_goals: string
  months: number
  days_per_week: number
  hours_per_day: number
  content: RoadmapContent
}

function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function RoadmapDetail() {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`http://44.201.125.113:8000/api/user/roadmaps/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setRoadmap(data)
      } catch (err) {
        console.error("Failed to load roadmap:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [id])

  if (loading) {
    return <div className="text-white p-6 md:ml-72">Loading roadmap...</div>
  }

  if (!roadmap) {
    return <div className="text-white p-6 md:ml-72">Roadmap not found.</div>
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full md:ml-72 px-4 sm:px-6 py-6 bg-black min-h-screen text-white">
        {/* Header Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow mb-8">
          <h1 className="text-3xl font-bold mb-2">{toTitleCase(roadmap.learning_goals)}</h1>
          <p className="text-sm text-gray-400">
            Duration: {roadmap.months} month(s), {roadmap.days_per_week} days/week, {roadmap.hours_per_day} hrs/day
          </p>
          <p className="text-sm text-green-400 mt-1">
            {roadmap.content?.message} | Progress: {roadmap.content?.progress?.percent_complete}%
          </p>
        </div>

        {/* Weekly Breakdown */}
        {Object.entries(roadmap.content.roadmap).map(([weekKey, days]) => (
          <details
            key={weekKey}
            className="bg-gray-900 border border-gray-700 rounded-lg mb-4 shadow"
          >
            <summary className="cursor-pointer select-none text-lg font-semibold px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-t">
              {weekKey.toUpperCase()}
            </summary>

            <div className="px-4 sm:px-6 py-5 space-y-6">
              {Object.entries(days).map(([dayKey, items]) => (
                <div key={dayKey}>
                  <h3 className="text-base font-semibold mb-3 text-teal-400 uppercase tracking-wide">
                    {dayKey}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, idx) => {
                      const parts = item.resource.split(" - ")
                      const url = parts[1] || "#"

                      return (
                        <div
                          key={idx}
                          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all"
                        >
                          <h4 className="text-sm font-semibold text-white mb-2">
                            {idx + 1}. {item.topic}
                          </h4>
                          <div className="flex justify-between items-center">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#18cb96] underline hover:brightness-110"
                            >
                              Start Learning →
                            </a>
                            <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
                              {item.hours} hrs
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </main>
    </div>
  )
}
