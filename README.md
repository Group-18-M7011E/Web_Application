# Outlift

Social fitness app for M7011E Design of Dynamic Web Systems (LTU), group 18.
Live: https://group-18-m7011e-ltu.se

## Repository layout

```text
backend/            Flask API (Python), Dockerfile, pytest tests
frontend/           React + TypeScript (Vite), Dockerfile, nginx config
charts/outlift/     Helm chart: Deployments, Services, Ingress, HTTPS redirect
argocd/             Argo CD Application that deploys the Helm chart
.github/workflows/  CI/CD pipeline
```

## How a change reaches the cluster

1. Push to `main`.
2. GitHub Actions runs the backend tests (with coverage), builds the frontend and lints the Helm chart.
3. If everything passes, it builds both Docker images and pushes them to `ghcr.io/group-18-m7011e/outlift-{backend,frontend}`, tagged with the commit SHA.
4. It writes that SHA into `charts/outlift/values.yaml` and commits it.
5. Argo CD watches `main`, sees the new image tag and rolls out the new version.

Pushes to other branches and pull requests only run step 2. Nothing is deployed from them.

## Run locally

Backend (terminal 1):

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
python app.py
```

Frontend (terminal 2). The Vite dev server forwards `/api` to Flask on port 5001
(not 5000: on macOS the AirPlay Receiver occupies port 5000 and answers with 403):

```bash
cd frontend
npm install
npm run dev
```

Tests with coverage:

```bash
cd backend
pytest --cov=app --cov-report=term-missing
```
