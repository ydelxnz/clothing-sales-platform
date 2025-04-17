"use client"

import { useEffect, useState } from "react"
import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, ComposedChart } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// 生成模拟的历史数据和预测数据
const generateData = (days: number, showConfidenceInterval: boolean) => {
  const data = []
  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - 90) // 过去90天的数据

  // 生成历史数据
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // 添加一些季节性和趋势
    const trend = i * 5
    const seasonal = Math.sin(i / 7) * 300
    const random = Math.random() * 200 - 100

    const value = 3000 + trend + seasonal + random

    data.push({
      date: date.toISOString().split("T")[0],
      销售额: Math.round(value),
      类型: "历史",
    })
  }

  // 生成预测数据
  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)

    // 预测值基于历史趋势，但添加一些不确定性
    const trend = (90 + i) * 5
    const seasonal = Math.sin((90 + i) / 7) * 300
    const random = Math.random() * 100 - 50

    const value = 3000 + trend + seasonal + random
    const lowerBound = value - value * 0.1 - i * 10
    const upperBound = value + value * 0.1 + i * 10

    data.push({
      date: date.toISOString().split("T")[0],
      销售额: Math.round(value),
      类型: "预测",
      ...(showConfidenceInterval && {
        下限: Math.round(lowerBound),
        上限: Math.round(upperBound),
      }),
    })
  }

  return data
}

interface SalesForecastChartProps {
  forecastDays: number
  showConfidenceInterval: boolean
}

export default function SalesForecastChart({ forecastDays, showConfidenceInterval }: SalesForecastChartProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsMounted(true)
    setData(generateData(forecastDays, showConfidenceInterval))
  }, [forecastDays, showConfidenceInterval])

  if (!isMounted) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>加载中...</CardContent>
      </Card>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          interval={Math.ceil(data.length / 15)}
        />
        <YAxis />
        <Tooltip labelFormatter={(value) => `日期: ${value}`} formatter={(value, name) => [value, name]} />
        <Legend />

        {showConfidenceInterval && (
          <Area type="monotone" dataKey="上限" stroke="transparent" fill="#8884d8" fillOpacity={0.2} />
        )}

        {showConfidenceInterval && (
          <Area type="monotone" dataKey="下限" stroke="transparent" fill="#8884d8" fillOpacity={0.2} />
        )}

        <Line
          type="monotone"
          dataKey="销售额"
          stroke="#8884d8"
          strokeWidth={2}
          dot={(props) => {
            const { cx, cy, payload } = props
            return payload.类型 === "历史" ? (
              <circle cx={cx} cy={cy} r={3} fill="#8884d8" />
            ) : (
              <circle cx={cx} cy={cy} r={3} fill="#82ca9d" stroke="#8884d8" strokeWidth={1} />
            )
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

