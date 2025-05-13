import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const buttonStyle = {
  backgroundColor: "#18cb96",
  color: "#ffffff",
}

export default function CreateRoadmap() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    learning_goals: "",
    months: undefined as number | undefined,
    days_per_week: undefined as number | undefined,
    hours_per_day: undefined as number | undefined,
  })
  const [creating, setCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    const { learning_goals, months, days_per_week, hours_per_day } = formData

    if (!learning_goals || !months || !days_per_week || !hours_per_day) {
      alert("Please fill out all fields.")
      setCreating(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://44.201.125.113:8000/api/generate_roadmap_stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to create roadmap")
      const data = await res.json()
      console.log("Created roadmap:", data)

      // Delay redirect slightly for UX (optional)
      setTimeout(() => navigate("/dashboard"), 1000)
    } catch (err) {
      alert("Error creating roadmap.")
      console.error(err)
      setCreating(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full md:ml-72 flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6">
        {creating ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Creating your roadmap... Do not refresh your page.
            </h2>
            <p className="text-gray-400">
              Please wait while we generate your personalized plan.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create New Roadmap</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-1">Topic You Want to Learn</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  value={formData.learning_goals}
                  onChange={(e) =>
                    setFormData({ ...formData, learning_goals: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm mb-1">Months</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.months || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, months: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm mb-1">Days/Week</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={7}
                    value={formData.days_per_week || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, days_per_week: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm mb-1">Hours/Day</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={12}
                    value={formData.hours_per_day || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, hours_per_day: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 rounded hover:brightness-90 transition font-medium text-lg"
                style={buttonStyle}
              >
                Create Roadmap
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
