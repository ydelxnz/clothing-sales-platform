"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

const data = [
  { name: "1月", 销售额: 4000, 订单数: 240 },
  { name: "2月", 销售额: 3000, 订单数: 198 },
  { name: "3月", 销售额: 2000, 订单数: 120 },
  { name: "4月", 销售额: 2780, 订单数: 160 },
  { name: "5月", 销售额: 1890, 订单数: 110 },
  { name: "6月", 销售额: 2390, 订单数: 140 },
  { name: "7月", 销售额: 3490, 订单数: 210 },
  { name: "8月", 销售额: 4000, 订单数: 240 },
  { name: "9月", 销售额: 4500, 订单数: 270 },
  { name: "10月", 销售额: 5200, 订单数: 310 },
  { name: "11月", 销售额: 6000, 订单数: 350 },
  { name: "12月", 销售额: 7000, 订单数: 400 },
]

export default function SalesOverviewChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>加载中...</CardContent>
      </Card>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="销售额" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="订单数" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

