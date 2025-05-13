import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)
      formData.append("grant_type", "password")

      const res = await fetch("http://44.201.125.113:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Login failed")

      localStorage.setItem("token", data.access_token)

      // ✅ Force redirect to dashboard so App.tsx picks up new token
      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">Sign In</h2>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
