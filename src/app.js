import React from "react"
import { createRoot } from "react-dom/client"

import Navigation from "./components/navigation"
import "./components/navigation.css"

/*
  This is the core preset table scaffold.
  Data wiring, tag logic, validation, and submission
  will plug in HERE without rewriting structure.
*/

const PresetTable = () => {
  const presets = [
    {
      name: "Default Tags",
      author: "System",
      version: "1.0.0",
      updated: "2025-01-01",
    },
    {
      name: "Streamer Pack",
      author: "Community",
      version: "1.2.3",
      updated: "2025-02-14",
    },
  ]

  return (
    <section style={{ padding: "2rem" }}>
      <h2 className="section-title" style={{ marginBottom: "1rem" }}>
        Preset Library
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Author</th>
            <th align="left">Version</th>
            <th align="left">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {presets.map((preset, index) => (
            <tr key={index}>
              <td>{preset.name}</td>
              <td>{preset.author}</td>
              <td>{preset.version}</td>
              <td>{preset.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const App = () => {
  return (
    <>
      <Navigation />
      <PresetTable />
    </>
  )
}

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App />)
