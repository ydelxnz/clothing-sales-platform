"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// 生成模拟的库存水平数据
const generateInventoryData = () => {
  const data = []
  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - 180) // 过去180天的数据

  // 初始库存水平
  const initialInventory = {
    上装: 3000,
    下装: 2500,
    连衣裙: 1800,
    外套: 1200,
    配饰: 4000,
  }

  // 生成历史库存数据
  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // 添加一些季节性和趋势
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    const seasonal = Math.sin(dayOfYear / 30) * 0.2 // 季节性波动

    // 为每个类别生成库存数据
    const inventory = {
      date: date.toISOString().split("T")[0],
      上装: Math.max(0, Math.round(initialInventory["上装"] * (1 + seasonal + Math.sin(i / 20) * 0.15 - i * 0.001))),
      下装: Math.max(0, Math.round(initialInventory["下装"] * (1 + seasonal + Math.sin(i / 25) * 0.1 - i * 0.0008))),
      连衣裙: Math.max(
        0,
        Math.round(initialInventory["连衣裙"] * (1 + seasonal + Math.sin(i / 15) * 0.2 - i * 0.0012)),
      ),
      外套: Math.max(0, Math.round(initialInventory["外套"] * (1 + seasonal + Math.cos(i / 30) * 0.25 - i * 0.0005))),
      配饰: Math.max(0, Math.round(initialInventory["配饰"] * (1 + seasonal + Math.sin(i / 10) * 0.05 - i * 0.0015))),
    }

    // 模拟补货
    if (i % 30 === 0) {
      inventory["上装"] += Math.round(initialInventory["上装"] * 0.3)
      inventory["下装"] += Math.round(initialInventory["下装"] * 0.3)
      inventory["连衣裙"] += Math.round(initialInventory["连衣裙"] * 0.3)
      inventory["外套"] += Math.round(initialInventory["外套"] * 0.3)
      inventory["配饰"] += Math.round(initialInventory["配饰"] * 0.3)
    }

    data.push(inventory)
  }

  return data
}

export default function InventoryLevelChart() {
  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsMounted(true)
    setData(generateInventoryData())
  }, [])

  if (!isMounted) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>加载中...</CardContent>
      </Card>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
          interval={Math.ceil(data.length / 12)}
        />
        <YAxis />
        <Tooltip labelFormatter={(value) => `日期: ${value}`} formatter={(value, name) => [value, name]} />
        <Legend />
        <Line type="monotone" dataKey="上装" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="下装" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="连衣裙" stroke="#ffc658" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="外套" stroke="#ff8042" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="配饰" stroke="#0088fe" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

