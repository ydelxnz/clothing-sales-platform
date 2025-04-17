"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

const data = [
  { name: "1月", 今年: 4000, 去年: 3200 },
  { name: "2月", 今年: 3000, 去年: 2800 },
  { name: "3月", 今年: 2000, 去年: 1800 },
  { name: "4月", 今年: 2780, 去年: 2500 },
  { name: "5月", 今年: 1890, 去年: 1700 },
  { name: "6月", 今年: 2390, 去年: 2100 },
  { name: "7月", 今年: 3490, 去年: 3000 },
  { name: "8月", 今年: 4000, 去年: 3500 },
  { name: "9月", 今年: 4500, 去年: 4000 },
  { name: "10月", 今年: 5200, 去年: 4500 },
  { name: "11月", 今年: 6000, 去年: 5200 },
  { name: "12月", 今年: 7000, 去年: 6000 },
]

export default function SalesComparisonChart() {
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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="今年" fill="#8884d8" />
        <Bar dataKey="去年" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

