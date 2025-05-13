import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

interface Roadmap {
  id: string
  learning_goals: string
}

const buttonStyle = {
  backgroundColor: "#18cb96",
  color: "#ffffff",
}

export default function Sidebar() {
  const navigate = useNavigate()
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [isOpen, setIsOpen] = useState(false)

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
        console.error("Failed to fetch roadmaps")
      }
    }

    fetchRoadmaps()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <>
      {/* 🍔 Hamburger Button (Right only on mobile) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </div>
      </button>

      {/* Sidebar (Always on left) */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-gray-950 text-white flex flex-col justify-between border-r border-gray-800 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        {/* Top Section */}
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-center border-b border-gray-800">
            <img src="/logo-2.svg" alt="LearnScape Logo" className="h-24 w-auto" />
          </div>

          <div className="p-4 space-y-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 rounded text-center hover:brightness-90 transition"
              style={buttonStyle}
              onClick={() => setIsOpen(false)}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/create"
              className="block px-4 py-2 rounded text-center hover:brightness-90 transition"
              style={buttonStyle}
              onClick={() => setIsOpen(false)}
            >
              ➕ Create New Roadmap
            </Link>
          </div>

          <div className="px-4 mt-4 overflow-y-auto flex-1">
            <h2 className="text-xs uppercase text-gray-500 mb-2">Saved Roadmaps</h2>
            <div className="space-y-1 pb-6">
              {roadmaps.map((rm) => (
                <Link
                  key={rm.id}
                  to={`/roadmap/${rm.id}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {rm.learning_goals}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded text-center hover:brightness-90 transition"
            style={buttonStyle}
          >
            🔓 Logout
          </button>
          <a
            href="https://www.learnscapeai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-400 hover:text-white text-center"
          >
            🌐 Main Site
          </a>
        </div>
      </div>
    </>
  )
}
