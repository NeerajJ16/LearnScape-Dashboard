import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://44.201.125.113:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Registration failed")

      alert("Registration successful! Please log in.")
      navigate("/")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600"
          required
        />
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
        <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 rounded">Create Account</button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-400 underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}