"use client";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeeklyMetrics {
  [date: string]: {
    total_calls: number;
    automated_calls: number;
    transferred_calls: number;
  };
}

interface Props {
  weeklyMetrics: WeeklyMetrics;
}

export function Overview({ weeklyMetrics = {} }) {
  const get_data = () => {
    return Object.entries(weeklyMetrics).map(([date, metrics]) => {
      const metrics_dict: any = metrics;
      return {
        name: date,
        total_calls: metrics_dict.total_calls,
        automated_calls: metrics_dict.automated_calls,
        transferred_calls: metrics_dict.transferred_calls,
      };
    });
  };
  console.log(get_data());
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={get_data()}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_calls" fill="#f97316" />
        <Bar dataKey="automated_calls" fill="#967bb6" />
        <Bar dataKey="transferred_calls" fill="#FDE767" />
      </BarChart>
    </ResponsiveContainer>
  );
}
//
