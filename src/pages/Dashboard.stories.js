// src/component/dashboard/Dashboard.stories.js

import React from "react";
import { storiesOf } from "@storybook/react";

// Import your Dashboard component
import Dashboard from "./Dashboard";

// Mock data for the component (you may customize it as needed)

import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";


// Stories
storiesOf("Dashboard", module).add("Default", () => (
  <Dashboard
    currencyList={Object.keys(mockData.results[0].bestExecutionData.orderVolume)}
    mockData={mockData}
    timestamps={timestamps}
  />
));
