// Calls the Flask backend on the same domain: Traefik sends every /api/... request to the backend service.
fetch('/api/hello')
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  })
  .then((data) => {
    document.getElementById('backend-message').textContent = data.msg
  })
  .catch((error) => {
    document.getElementById('backend-message').textContent = `not reachable (${error.message})`
  })
