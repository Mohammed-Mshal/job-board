"use client"

import { AdminUserStats } from "@/types/api.types"
import { useTranslations } from "next-intl"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface AdminUserStatsChartProps {
  stats: AdminUserStats
}

const BAR_COLORS = {
  "job-seekers": "#A1A1AA",
  companies: "#60A5FA",
  admins: "#D0BCFF",
  suspended: "#F87171",
} as const

type StatKey = keyof typeof BAR_COLORS

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ value?: number; payload?: { label: string } }>
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  const value = payload[0]?.value ?? 0
  const label = payload[0]?.payload?.label ?? ""

  return (
    <div className="rounded-lg border border-[#27272A] bg-[#111113] px-3 py-2 shadow-lg">
      <p className="text-xs text-[#A1A1AA]">{label}</p>
      <p className="text-sm font-semibold text-[#fafafa]">{value}</p>
    </div>
  )
}

export default function AdminUserStatsChart({ stats }: AdminUserStatsChartProps) {
  const t = useTranslations("AdminPage.overview.stats")

  const chartData = (
    [
      ["job-seekers", stats.jobSeekers],
      ["companies", stats.companies],
      ["admins", stats.admins],
      ["suspended", stats.suspended],
    ] as const
  ).map(([key, value]) => ({
    key,
    value,
    label: t(key),
    color: BAR_COLORS[key as StatKey],
  }))

  const maxValue = Math.max(...chartData.map((item) => item.value), 1)

  return (
    <div className="mb-8 rounded-xl border border-[#27272A] bg-[#0f0f11] p-5 lg:p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#71717A]">
            {t("total")}
          </p>
          <p className="mt-1 text-3xl font-bold text-[#fafafa]">{stats.total}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {chartData.map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="h-[260px] w-full"
        role="img"
        aria-label={t("chart-aria", { total: stats.total })}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            barCategoryGap="24%"
          >
            <CartesianGrid
              stroke="#27272A"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#71717A", fontSize: 12 }}
              axisLine={{ stroke: "#27272A" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, maxValue]}
              tick={{ fill: "#71717A", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(208,188,255,0.06)" }}
              content={<ChartTooltip />}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {chartData.map((item) => (
                <Cell key={item.key} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
