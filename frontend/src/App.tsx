import { useEffect, useState } from 'react'

type HelloResponse = { msg: string }

export default function App() {
  const [message, setMessage] = useState('…')

  useEffect(() => {
    // Same domain as the page: Traefik sends every /api/... request to the backend service.
    // Locally, the Vite dev server forwards /api to Flask on port 5000 (see vite.config.ts).
    fetch('/api/hello')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<HelloResponse>
      })
      .then((data) => setMessage(data.msg))
      .catch((error: Error) => setMessage(`not reachable (${error.message})`))
  }, [])

  return (
    <main>
      <h1>Outlift</h1>
      <p className="muted">Group 18 · M7011E Design of Dynamic Web Systems</p>
      <p>
        Backend says: <strong>{message}</strong>
      </p>
    </main>
  )
}
