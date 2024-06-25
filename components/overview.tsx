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

interface WeeklyMetricsProps {
  weeklyMetrics: WeeklyMetrics;
}

export function Overview({ weeklyMetrics }: WeeklyMetricsProps) {
  const get_data = () => {
    // Sort the entries based on the date key
    const sortedEntries = Object.entries(weeklyMetrics).sort(([date1], [date2]) => {
      return new Date(date1).getTime() - new Date(date2).getTime();
    });

    // Map the sorted entries to the desired format
    return sortedEntries.map(([date, metrics]) => {
      const metrics_dict: any = metrics;
      return {
        name: date,
        total_calls: metrics_dict.total_calls,
        automated_calls: metrics_dict.automated_calls,
        transferred_calls: metrics_dict.transferred_calls,
      };
    });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={get_data()}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_calls" fill="#2563eb" />
        <Bar dataKey="automated_calls" fill="#22d3ee" />
        <Bar dataKey="transferred_calls" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
//
