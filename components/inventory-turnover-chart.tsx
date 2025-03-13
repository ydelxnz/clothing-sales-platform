"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 模拟库存周转率数据
const turnoverByCategory = [
  { category: "上装", 周转率: 5.2, 周转天数: 70, 同比: "+0.5" },
  { category: "下装", 周转率: 4.8, 周转天数: 76, 同比: "+0.3" },
  { category: "连衣裙", 周转率: 3.5, 周转天数: 104, 同比: "-0.2" },
  { category: "外套", 周转率: 2.1, 周转天数: 174, 同比: "-0.4" },
  { category: "配饰", 周转率: 6.7, 周转天数: 54, 同比: "+0.8" },
]

// 模拟月度周转率数据
const turnoverByMonth = [
  { month: "1月", 周转率: 4.0, 目标: 4.5 },
  { month: "2月", 周转率: 3.8, 目标: 4.2 },
  { month: "3月", 周转率: 4.2, 目标: 4.8 },
  { month: "4月", 周转率: 4.5, 目标: 4.5 },
  { month: "5月", 周转率: 4.1, 目标: 4.3 },
  { month: "6月", 周转率: 4.3, 目标: 4.7 },
]

export default function InventoryTurnoverChart() {
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
    <Tabs defaultValue="category">
      <TabsList className="mb-4">
        <TabsTrigger value="category">按类别</TabsTrigger>
        <TabsTrigger value="monthly">月度趋势</TabsTrigger>
      </TabsList>

      <TabsContent value="category">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={turnoverByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="周转率" fill="#8884d8" name="周转率" />
              <Bar yAxisId="right" dataKey="周转天数" fill="#82ca9d" name="周转天数" />
            </BarChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>
              库存周转率分析显示，配饰类产品周转率最高(6.7)，周转天数最短(54天)；外套类产品周转率最低(2.1)，周转天数最长(174天)。
            </p>
            <p className="mt-2">
              与去年同期相比，上装、下装和配饰类产品的周转率有所提高，而连衣裙和外套类产品的周转率有所下降。
            </p>
            <p className="mt-2">建议：对外套和连衣裙类产品进行促销清库，提高周转率；保持配饰类产品的高周转率策略。</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="monthly">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={turnoverByMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="周转率" fill="#8884d8" />
              <Line type="monotone" dataKey="目标" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>月度周转率趋势显示，4月份达到最高周转率(4.5)，与目标持平；2月份周转率最低(3.8)，未达到目标(4.2)。</p>
            <p className="mt-2">整体来看，实际周转率普遍低于目标值，表明库存管理仍有优化空间。</p>
            <p className="mt-2">
              建议：分析2月份周转率低的原因，可能与春节假期有关；借鉴4月份的成功经验，提高其他月份的周转效率。
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

