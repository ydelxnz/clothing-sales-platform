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
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// 模拟竞争对手价格数据
const competitorData = [
  {
    category: "上装",
    我们的价格: 99,
    竞争对手A: 109,
    竞争对手B: 89,
    竞争对手C: 119,
    行业平均: 104,
    价格差异: -4.8,
  },
  {
    category: "下装",
    我们的价格: 159,
    竞争对手A: 169,
    竞争对手B: 149,
    竞争对手C: 179,
    行业平均: 164,
    价格差异: -3.0,
  },
  {
    category: "连衣裙",
    我们的价格: 299,
    竞争对手A: 279,
    竞争对手B: 319,
    竞争对手C: 289,
    行业平均: 297,
    价格差异: 0.7,
  },
  {
    category: "外套",
    我们的价格: 399,
    竞争对手A: 429,
    竞争对手B: 379,
    竞争对手C: 449,
    行业平均: 414,
    价格差异: -3.6,
  },
  {
    category: "配饰",
    我们的价格: 59,
    竞争对手A: 49,
    竞争对手B: 69,
    竞争对手C: 59,
    行业平均: 59,
    价格差异: 0.0,
  },
]

// 模拟价格定位数据
const pricePositioningData = [
  { name: "我们的品牌", value: 65, fill: "#8884d8" },
  { name: "竞争对手A", value: 75, fill: "#83a6ed" },
  { name: "竞争对手B", value: 55, fill: "#8dd1e1" },
  { name: "竞争对手C", value: 85, fill: "#82ca9d" },
  { name: "行业平均", value: 70, fill: "#ffc658" },
]

// 模拟价格趋势数据
const priceTrendData = [
  { month: "1月", 我们的价格: 100, 竞争对手A: 110, 竞争对手B: 90, 竞争对手C: 120 },
  { month: "2月", 我们的价格: 100, 竞争对手A: 110, 竞争对手B: 90, 竞争对手C: 120 },
  { month: "3月", 我们的价格: 95, 竞争对手A: 105, 竞争对手B: 85, 竞争对手C: 115 },
  { month: "4月", 我们的价格: 95, 竞争对手A: 105, 竞争对手B: 85, 竞争对手C: 115 },
  { month: "5月", 我们的价格: 90, 竞争对手A: 100, 竞争对手B: 80, 竞争对手C: 110 },
  { month: "6月", 我们的价格: 85, 竞争对手A: 95, 竞争对手B: 75, 竞争对手C: 105 },
  { month: "7月", 我们的价格: 90, 竞争对手A: 100, 竞争对手B: 80, 竞争对手C: 110 },
  { month: "8月", 我们的价格: 95, 竞争对手A: 105, 竞争对手B: 85, 竞争对手C: 115 },
  { month: "9月", 我们的价格: 100, 竞争对手A: 110, 竞争对手B: 90, 竞争对手C: 120 },
  { month: "10月", 我们的价格: 95, 竞争对手A: 105, 竞争对手B: 85, 竞争对手C: 115 },
  { month: "11月", 我们的价格: 85, 竞争对手A: 95, 竞争对手B: 75, 竞争对手C: 105 },
  { month: "12月", 我们的价格: 80, 竞争对手A: 90, 竞争对手B: 70, 竞争对手C: 100 },
]

export default function CompetitorPriceComparison() {
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
    <Tabs defaultValue="comparison">
      <TabsList className="mb-4">
        <TabsTrigger value="comparison">价格对比</TabsTrigger>
        <TabsTrigger value="positioning">价格定位</TabsTrigger>
        <TabsTrigger value="trend">价格趋势</TabsTrigger>
      </TabsList>

      <TabsContent value="comparison">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={competitorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="我们的价格" fill="#8884d8" />
              <Bar dataKey="竞争对手A" fill="#83a6ed" />
              <Bar dataKey="竞争对手B" fill="#8dd1e1" />
              <Bar dataKey="竞争对手C" fill="#82ca9d" />
              <Bar dataKey="行业平均" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>产品类别</TableHead>
                <TableHead>我们的价格</TableHead>
                <TableHead>竞争对手A</TableHead>
                <TableHead>竞争对手B</TableHead>
                <TableHead>竞争对手C</TableHead>
                <TableHead>行业平均</TableHead>
                <TableHead>价格差异</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorData.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>¥{item["我们的价格"]}</TableCell>
                  <TableCell>¥{item["竞争对手A"]}</TableCell>
                  <TableCell>¥{item["竞争对手B"]}</TableCell>
                  <TableCell>¥{item["竞争对手C"]}</TableCell>
                  <TableCell>¥{item["行业平均"]}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item["价格差异"] < -1
                          ? "border-green-500 text-green-500"
                          : item["价格差异"] > 1
                            ? "border-red-500 text-red-500"
                            : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {item["价格差异"] > 0 ? "+" : ""}
                      {item["价格差异"]}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-sm text-muted-foreground">
            <p>竞争对手价格分析显示，我们的产品价格总体略低于行业平均水平，具有一定的价格竞争力。</p>
            <p className="mt-2">
              上装、下装和外套类产品价格低于行业平均，而连衣裙价格略高于行业平均。配饰类产品价格与行业平均持平。
            </p>
            <p className="mt-2">
              建议：保持上装、下装和外套的价格优势；考虑适当调整连衣裙价格以增强竞争力；关注竞争对手B的低价策略，评估其对市场份额的影响。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="positioning">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={pricePositioningData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "价格定位 (百分位)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="value">
                {pricePositioningData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>价格定位分析显示，我们的品牌在市场中处于中等偏下的价格定位(65分位)，低于行业平均水平(70分位)。</p>
            <p className="mt-2">
              竞争对手定位分布：竞争对手C定位最高(85分位)，属于高端市场；竞争对手A次之(75分位)，属于中高端市场；竞争对手B定位最低(55分位)，属于中低端市场。
            </p>
            <p className="mt-2">
              建议：我们的品牌可以继续保持中等偏下的价格定位，与竞争对手B形成差异化竞争；通过提升产品质量和服务来增加品牌价值，而非简单提高价格。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="trend">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="我们的价格" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="竞争对手A" stroke="#83a6ed" />
              <Line type="monotone" dataKey="竞争对手B" stroke="#8dd1e1" />
              <Line type="monotone" dataKey="竞争对手C" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>
              价格趋势分析显示，所有品牌在年中(5-7月)和年末(11-12月)都有明显的降价趋势，这可能与夏季促销和年末促销季相关。
            </p>
            <p className="mt-2">我们的品牌价格变动与行业趋势基本一致，但在11-12月的降价幅度略大于竞争对手。</p>
            <p className="mt-2">各品牌之间的价格差距在一年中保持相对稳定，价格定位没有发生显著变化。</p>
            <p className="mt-2">
              建议：继续跟随行业季节性促销趋势，但可以考虑在年末促销中适当减小降价幅度，以保持利润率；关注竞争对手的价格变动，及时调整自身促销策略。
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

