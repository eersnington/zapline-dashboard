"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Monday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Tuesday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Wednesday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Thursday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Friday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Saturday",
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: "Sunday",
    total: Math.floor(Math.random() * 10) + 1,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
