"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, ComposedChart } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

// 生成模拟的价格优化数据
const generatePriceOptimizationData = (basePrice: number, discountPercentage: number) => {
  const data = []
  const originalPrice = basePrice
  const discountedPrice = Math.round(basePrice * (1 - discountPercentage / 100))

  // 基础参数
  const baseSales = 1000
  const elasticity = -1.5 // 价格弹性系数

  // 生成不同折扣幅度下的销量和收入数据
  for (let discount = 0; discount <= 70; discount += 5) {
    const price = Math.round(originalPrice * (1 - discount / 100))
    const priceChange = (price - originalPrice) / originalPrice // 价格变动百分比

    // 根据价格弹性计算销量变化
    // 销量变化 = 价格弹性系数 * 价格变化百分比
    const salesChange = elasticity * priceChange
    const sales = Math.round(baseSales * (1 + salesChange))

    // 计算收入和利润
    const revenue = price * sales
    const cost = originalPrice * 0.6 * sales // 假设成本是原价的60%
    const profit = revenue - cost

    data.push({
      discount,
      price,
      sales,
      revenue,
      profit,
      isOptimal: discount === discountPercentage,
    })
  }

  return data
}

interface PriceOptimizationChartProps {
  basePrice: number
  discountPercentage: number
}

export default function PriceOptimizationChart({ basePrice, discountPercentage }: PriceOptimizationChartProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setIsMounted(true)
    setData(generatePriceOptimizationData(basePrice, discountPercentage))
  }, [basePrice, discountPercentage])

  if (!isMounted) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <CardContent>加载中...</CardContent>
      </Card>
    )
  }

  // 找到最优折扣点
  const optimalProfitPoint = data.reduce((max, point) => (point.profit > max.profit ? point : max), data[0])

  const optimalRevenuePoint = data.reduce((max, point) => (point.revenue > max.revenue ? point : max), data[0])

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="discount" label={{ value: "折扣幅度 (%)", position: "insideBottomRight", offset: -10 }} />
          <YAxis yAxisId="left" label={{ value: "销量 (件)", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "利润/收入 (¥)", angle: -90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Area yAxisId="right" type="monotone" dataKey="profit" fill="#82ca9d" stroke="#82ca9d" name="利润" />
          <Area yAxisId="right" type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" name="收入" />
          <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#ff7300" name="销量" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">最大利润点</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{optimalProfitPoint.discount}% 折扣</div>
            <p className="text-sm text-muted-foreground">
              价格: ¥{optimalProfitPoint.price} | 销量: {optimalProfitPoint.sales} | 利润: ¥
              {optimalProfitPoint.profit.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">最大收入点</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{optimalRevenuePoint.discount}% 折扣</div>
            <p className="text-sm text-muted-foreground">
              价格: ¥{optimalRevenuePoint.price} | 销量: {optimalRevenuePoint.sales} | 收入: ¥
              {optimalRevenuePoint.revenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>价格优化分析显示，随着折扣幅度的增加，销量呈现上升趋势，但收入和利润呈现倒U形曲线。</p>
        <p className="mt-2">
          当前选择的{discountPercentage}%折扣对应的价格为¥{Math.round(basePrice * (1 - discountPercentage / 100))}
          ，预计销量为{data.find((item) => item.discount === discountPercentage)?.sales}件。
        </p>
        <p className="mt-2">
          建议：为最大化利润，最佳折扣幅度应为{optimalProfitPoint.discount}%；为最大化收入，最佳折扣幅度应为
          {optimalRevenuePoint.discount}%。
        </p>
      </div>
    </div>
  )
}

