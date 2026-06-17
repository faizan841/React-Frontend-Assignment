import type { App, GraphData } from "../types";

export const apps: App[] = [
  { id: "app-1", name: "supertokens-golang", color: "#7C3AED", icon: "🔵" },
  { id: "app-2", name: "supertokens-java", color: "#DC2626", icon: "⚙️" },
  { id: "app-3", name: "supertokens-python", color: "#EA580C", icon: "🚀" },
  { id: "app-4", name: "supertokens-ruby", color: "#DB2777", icon: "💎" },
  { id: "app-5", name: "supertokens-go", color: "#9333EA", icon: "🧩" },
];

export const graphs: Record<string, GraphData> = {
  "app-1": {
    nodes: [
      {
        id: "node-1",
        type: "serviceNode",
        position: { x: 50, y: 50 },
        data: {
          label: "Postgres",
          description: "Primary relational database for user data.",
          status: "Success",
          sliderValue: 2,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🐘",
          provider: "aws",
        },
      },
      {
        id: "node-2",
        type: "serviceNode",
        position: { x: 500, y: 300 },
        data: {
          label: "Redis",
          description: "In-memory cache for session storage.",
          status: "Error",
          sliderValue: 2,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "📦",
          provider: "aws",
        },
      },
      {
        id: "node-3",
        type: "serviceNode",
        position: { x: 900, y: 50 },
        data: {
          label: "Mongodb",
          description: "Document store for analytics events.",
          status: "Error",
          sliderValue: 2,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🍃",
          provider: "aws",
        },
      },
    ],
    edges: [],
  },

  "app-2": {
    nodes: [
      {
        id: "node-4",
        type: "serviceNode",
        position: { x: 50, y: 100 },
        data: {
          label: "Postgres",
          description: "Java service database.",
          status: "Success",
          sliderValue: 45,
          pricePerHr: "$0.05/HR",
          metrics: { cpu: 0.04, memoryGB: 0.1, diskGB: 20.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🐘",
          provider: "aws",
        },
      },
      {
        id: "node-5",
        type: "serviceNode",
        position: { x: 500, y: 100 },
        data: {
          label: "Redis",
          description: "Cache layer for Java app.",
          status: "Success",
          sliderValue: 30,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "📦",
          provider: "aws",
        },
      },
    ],
    edges: [],
  },

  "app-3": {
    nodes: [
      {
        id: "node-6",
        type: "serviceNode",
        position: { x: 200, y: 150 },
        data: {
          label: "Mongodb",
          description: "Python service primary store.",
          status: "Success",
          sliderValue: 60,
          pricePerHr: "$0.04/HR",
          metrics: { cpu: 0.03, memoryGB: 0.08, diskGB: 15.0, region: 2 },
          activeResourceTab: "cpu",
          icon: "🍃",
          provider: "aws",
        },
      },
    ],
    edges: [],
  },

  "app-4": {
    nodes: [
      {
        id: "node-7",
        type: "serviceNode",
        position: { x: 100, y: 100 },
        data: {
          label: "Redis",
          description: "Ruby service cache.",
          status: "Error",
          sliderValue: 10,
          pricePerHr: "$0.02/HR",
          metrics: { cpu: 0.01, memoryGB: 0.03, diskGB: 5.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "📦",
          provider: "aws",
        },
      },
      {
        id: "node-8",
        type: "serviceNode",
        position: { x: 450, y: 250 },
        data: {
          label: "Postgres",
          description: "Ruby service database.",
          status: "Success",
          sliderValue: 25,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🐘",
          provider: "aws",
        },
      },
    ],
    edges: [],
  },

  "app-5": {
    nodes: [
      {
        id: "node-9",
        type: "serviceNode",
        position: { x: 150, y: 80 },
        data: {
          label: "Postgres",
          description: "Go service database.",
          status: "Success",
          sliderValue: 70,
          pricePerHr: "$0.03/HR",
          metrics: { cpu: 0.02, memoryGB: 0.05, diskGB: 10.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🐘",
          provider: "aws",
        },
      },
      {
        id: "node-10",
        type: "serviceNode",
        position: { x: 550, y: 80 },
        data: {
          label: "Mongodb",
          description: "Go service document store.",
          status: "Error",
          sliderValue: 15,
          pricePerHr: "$0.04/HR",
          metrics: { cpu: 0.03, memoryGB: 0.07, diskGB: 12.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "🍃",
          provider: "aws",
        },
      },
      {
        id: "node-11",
        type: "serviceNode",
        position: { x: 350, y: 300 },
        data: {
          label: "Redis",
          description: "Go service cache.",
          status: "Success",
          sliderValue: 50,
          pricePerHr: "$0.02/HR",
          metrics: { cpu: 0.01, memoryGB: 0.03, diskGB: 5.0, region: 1 },
          activeResourceTab: "cpu",
          icon: "📦",
          provider: "aws",
        },
      },
    ],
    edges: [],
  },
};
