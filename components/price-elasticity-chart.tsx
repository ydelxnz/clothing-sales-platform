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
  Scatter,
  ScatterChart,
  BarChart,
  Bar,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 生成模拟的价格弹性数据
const generateElasticityData = () => {
  const basePrice = 100
  const baseSales = 1000
  const elasticity = -1.5 // 价格弹性系数

  const data = []

  // 生成不同价格点的销量数据
  for (let i = -50; i <= 50; i += 5) {
    const priceChange = i / 100 // 价格变动百分比
    const price = basePrice * (1 + priceChange)

    // 根据价格弹性计算销量变化
    // 销量变化 = 价格弹性系数 * 价格变化百分比
    const salesChange = elasticity * priceChange
    const sales = baseSales * (1 + salesChange)

    // 添加一些随机噪声
    const noise = (Math.random() - 0.5) * 50

    data.push({
      price: Math.round(price),
      sales: Math.round(sales + noise),
      revenue: Math.round((sales + noise) * price),
    })
  }

  return data
}

// 生成模拟的类别价格弹性数据
const categoryElasticityData = [
  { category: "上装", elasticity: -1.2, optimalPrice: 89, maxRevenue: 98500 },
  { category: "下装", elasticity: -1.5, optimalPrice: 159, maxRevenue: 145600 },
  { category: "连衣裙", elasticity: -0.8, optimalPrice: 279, maxRevenue: 256700 },
  { category: "外套", elasticity: -0.6, optimalPrice: 359, maxRevenue: 312400 },
  { category: "配饰", elasticity: -2.1, optimalPrice: 49, maxRevenue: 67800 },
]

// 生成模拟的时间序列价格弹性数据
const timeSeriesElasticityData = [
  { month: "1月", elasticity: -1.2 },
  { month: "2月", elasticity: -1.3 },
  { month: "3月", elasticity: -1.4 },
  { month: "4月", elasticity: -1.5 },
  { month: "5月", elasticity: -1.6 },
  { month: "6月", elasticity: -1.7 },
  { month: "7月", elasticity: -1.5 },
  { month: "8月", elasticity: -1.3 },
  { month: "9月", elasticity: -1.1 },
  { month: "10月", elasticity: -0.9 },
  { month: "11月", elasticity: -0.7 },
  { month: "12月", elasticity: -0.6 },
]

export default function PriceElasticityChart() {
  const [isMounted, setIsMounted] = useState(false)
  const [elasticityData, setElasticityData] = useState<any[]>([])

  useEffect(() => {
    setIsMounted(true)
    setElasticityData(generateElasticityData())
  }, [])

  if (!isMounted) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>加载中...</CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="price-sales">
      <TabsList className="mb-4">
        <TabsTrigger value="price-sales">价格-销量关系</TabsTrigger>
        <TabsTrigger value="price-revenue">价格-收入关系</TabsTrigger>
        <TabsTrigger value="category">类别弹性对比</TabsTrigger>
        <TabsTrigger value="seasonal">季节性弹性变化</TabsTrigger>
      </TabsList>

      <TabsContent value="price-sales">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="price"
                name="价格"
                unit="¥"
                label={{ value: "价格 (¥)", position: "insideBottomRight", offset: -10 }}
              />
              <YAxis
                type="number"
                dataKey="sales"
                name="销量"
                unit="件"
                label={{ value: "销量 (件)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="价格-销量关系" data={elasticityData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>价格弹性分析显示，当价格上升时，销量呈现明显下降趋势，表明产品具有较高的价格敏感性。</p>
            <p className="mt-2">估计价格弹性系数约为 -1.5，意味着价格每上升1%，销量将下降约1.5%。</p>
            <p className="mt-2">
              建议：考虑在价格敏感度高的时期适当降低价格，以刺激销量增长；在价格敏感度低的季节或对特定客群可以考虑提高价格以增加利润。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="price-revenue">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="price"
                name="价格"
                unit="¥"
                label={{ value: "价格 (¥)", position: "insideBottomRight", offset: -10 }}
              />
              <YAxis
                type="number"
                dataKey="revenue"
                name="收入"
                unit="¥"
                label={{ value: "收入 (¥)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="价格-收入关系" data={elasticityData} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>价格-收入关系图显示，收入随价格变化呈现倒U形曲线，表明存在一个能够最大化收入的最优价格点。</p>
            <p className="mt-2">根据分析，最优价格点约为85-95元，此时可以实现收入最大化。</p>
            <p className="mt-2">
              建议：将基准价格设定在90元左右，可以在不同季节根据需求弹性适当调整，以最大化总体收入。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="category">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryElasticityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#8884d8"
                label={{ value: "价格弹性系数", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                label={{ value: "最优价格 (¥)", angle: -90, position: "insideRight" }}
              />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="elasticity" fill="#8884d8" name="价格弹性系数" />
              <Bar yAxisId="right" dataKey="optimalPrice" fill="#82ca9d" name="最优价格" />
            </BarChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>
              不同产品类别的价格弹性存在显著差异。配饰类产品价格弹性最高(-2.1)，表明价格变动对销量影响最大；而外套类产品价格弹性最低(-0.6)，表明消费者对外套价格变动的敏感度较低。
            </p>
            <p className="mt-2">
              建议：对于高弹性产品(如配饰)，采用低价策略以刺激销量；对于低弹性产品(如外套)，可以考虑提高价格以增加利润。
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="seasonal">
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeSeriesElasticityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "价格弹性系数", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="elasticity" stroke="#8884d8" activeDot={{ r: 8 }} name="价格弹性系数" />
            </LineChart>
          </ResponsiveContainer>

          <div className="text-sm text-muted-foreground">
            <p>
              价格弹性系数在一年中呈现明显的季节性变化。1-6月价格弹性逐渐增大(绝对值增大)，表明消费者对价格越来越敏感；而7-12月价格弹性逐渐减小，表明消费者对价格的敏感度降低。
            </p>
            <p className="mt-2">这种季节性变化可能与消费者购物习惯、节假日分布以及季节性产品需求有关。</p>
            <p className="mt-2">
              建议：在价格弹性高的月份(5-6月)采用更具吸引力的价格策略；在价格弹性低的月份(11-12月)可以适当提高价格以增加利润。
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

