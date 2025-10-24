"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type RevenueDataPoint = {
  month: string;
  revenue: number;
  subscriptions: number;
};

const revenueData = [
  { month: "Jan", revenue: 85000, subscriptions: 45 },
  { month: "Feb", revenue: 92000, subscriptions: 52 },
  { month: "Mar", revenue: 125430, subscriptions: 67 },
  { month: "Apr", revenue: 110000, subscriptions: 58 },
  { month: "May", revenue: 135000, subscriptions: 72 },
  { month: "Jun", revenue: 142000, subscriptions: 75 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Revenue Analytics
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Revenue Trend */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">
            Monthly Revenue Trend
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData as RevenueDataPoint[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `R${Number(value).toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Subscriptions */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">
            Active Subscriptions
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="subscriptions"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            R{revenueData[revenueData.length - 1].revenue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Current Month</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {(
              ((revenueData[revenueData.length - 1].revenue -
                revenueData[revenueData.length - 2].revenue) /
                revenueData[revenueData.length - 2].revenue) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-sm text-gray-600">Growth Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            R
            {(
              revenueData.reduce((sum, month) => sum + month.revenue, 0) /
              revenueData.length
            ).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Monthly Average</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {revenueData[revenueData.length - 1].subscriptions}
          </div>
          <div className="text-sm text-gray-600">Active Subs</div>
        </div>
      </div>
    </div>
  );
}
