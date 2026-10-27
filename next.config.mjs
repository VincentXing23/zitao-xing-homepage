import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Next's tracing and Turbopack watcher inside this project. Without
  // these roots, the nearby package-lock file makes Next scan the parent
  // workspace during startup.
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
}

export default nextConfig
