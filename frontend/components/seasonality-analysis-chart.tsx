"use client"

import { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 生成模拟的季节性数据
const weeklyData = [
  { name: "周一", 销售额: 4000 },
  { name: "周二", 销售额: 3500 },
  { name: "周三", 销售额: 3200 },
  { name: "周四", 销售额: 3800 },
  { name: "周五", 销售额: 4500 },
  { name: "周六", 销售额: 5200 },
  { name: "周日", 销售额: 4800 },
]

const monthlyData = [
  { name: "1月", 销售额: 4000, 同比: "+5%" },
  { name: "2月", 销售额: 3000, 同比: "+3%" },
  { name: "3月", 销售额: 2000, 同比: "-2%" },
  { name: "4月", 销售额: 2780, 同比: "+7%" },
  { name: "5月", 销售额: 1890, 同比: "+1%" },
  { name: "6月", 销售额: 2390, 同比: "+4%" },
  { name: "7月", 销售额: 3490, 同比: "+8%" },
  { name: "8月", 销售额: 4000, 同比: "+12%" },
  { name: "9月", 销售额: 4500, 同比: "+15%" },
  { name: "10月", 销售额: 5200, 同比: "+10%" },
  { name: "11月", 销售额: 6000, 同比: "+18%" },
  { name: "12月", 销售额: 7000, 同比: "+20%" },
]

const quarterlyData = [
  { name: "Q1", 销售额: 9000, 同比: "+2%" },
  { name: "Q2", 销售额: 7060, 同比: "+4%" },
  { name: "Q3", 销售额: 11990, 同比: "+12%" },
  { name: "Q4", 销售额: 18200, 同比: "+16%" },
]

const yearlyData = [
  { name: "2018", 销售额: 35000, 同比: "-" },
  { name: "2019", 销售额: 38000, 同比: "+8.6%" },
  { name: "2020", 销售额: 32000, 同比: "-15.8%" },
  { name: "2021", 销售额: 40000, 同比: "+25.0%" },
  { name: "2022", 销售额: 45000, 同比: "+12.5%" },
  { name: "2023", 销售额: 52000, 同比: "+15.6%" },
]

export default function SeasonalityAnalysisChart() {
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
    <Tabs defaultValue="weekly">
      <TabsList className="mb-4">
        <TabsTrigger value="weekly">周内分布</TabsTrigger>
        <TabsTrigger value="monthly">月度趋势</TabsTrigger>
        <TabsTrigger value="quarterly">季度分析</TabsTrigger>
        <TabsTrigger value="yearly">年度对比</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="销售额" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            周内销售分布分析显示周末（周五、周六、周日）销售额明显高于工作日，周六达到峰值。这表明消费者在周末有更多的购物时间和意愿。
          </p>
          <p className="mt-2">建议：在周末增加促销活动和营销力度，工作日可以考虑特殊折扣来提升销量。</p>
        </div>
      </TabsContent>

      <TabsContent value="monthly">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="销售额" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            月度销售趋势显示明显的季节性模式，年末（10-12月）销售额显著高于年初，这与节日购物季相符。同时，7-9月也有一个销售高峰，可能与夏季促销和开学季相关。
          </p>
          <p className="mt-2">建议：在销售淡季（2-5月）增加促销力度，提前为销售旺季备货，确保库存充足。</p>
        </div>
      </TabsContent>

      <TabsContent value="quarterly">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={quarterlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="销售额" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            季度分析显示Q4（10-12月）销售额最高，Q2（4-6月）销售额最低。这符合服装行业的典型季节性模式，年末节日季和年中夏季是两个主要销售高峰。
          </p>
          <p className="mt-2">
            建议：在Q2季度推出更具吸引力的促销活动，提高客户参与度；在Q3和Q4提前规划库存和营销策略，最大化旺季销售。
          </p>
        </div>
      </TabsContent>

      <TabsContent value="yearly">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="销售额" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            年度销售趋势显示，除2020年（可能受疫情影响）外，整体呈现稳定增长趋势。2021年后增长加速，2023年达到历史最高点。
          </p>
          <p className="mt-2">
            建议：分析2021年后的增长因素，继续保持成功的营销策略，同时关注市场变化，及时调整产品结构和定价策略，以维持增长势头。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

