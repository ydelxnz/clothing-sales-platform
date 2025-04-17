"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface PricingOptimizationChartProps {
  marginTarget: number
  salesVolumeTarget: number
  competitorMatching: boolean // 保留参数以避免破坏接口兼容性
  seasonalAdjustment: boolean
}

export default function PricingOptimizationChart({
  marginTarget,
  salesVolumeTarget,
  competitorMatching,
  seasonalAdjustment,
}: PricingOptimizationChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // 模拟数据生成，实际应用中应该从API获取
    const generateData = () => {
      const baseData = [
        { name: "上装", currentPrice: 100, currentProfit: 22, currentSales: 1000 },
        { name: "下装", currentPrice: 120, currentProfit: 25, currentSales: 800 },
        { name: "连衣裙", currentPrice: 150, currentProfit: 28, currentSales: 600 },
        { name: "外套", currentPrice: 200, currentProfit: 30, currentSales: 400 },
        { name: "配饰", currentPrice: 50, currentProfit: 20, currentSales: 1200 },
      ]

      // 根据参数调整最优价格和预期效果
      return baseData.map((item) => {
        // 基础调整因子
        let priceFactor = 1.0 + (marginTarget - 20) / 100

        // 销量目标调整
        priceFactor *= (100 - salesVolumeTarget) / 30 + 0.9

        // 竞争对手匹配调整已移除

        // 季节性调整
        if (seasonalAdjustment) {
          // 模拟季节性因素影响
          const seasonalFactor = item.name === "外套" ? 1.1 : item.name === "连衣裙" ? 0.9 : 1.0
          priceFactor *= seasonalFactor
        }

        const optimalPrice = Math.round(item.currentPrice * priceFactor)

        // 计算价格变化对销量和利润的影响
        const priceElasticity = item.name === "连衣裙" ? -2.3 : item.name === "外套" ? -0.8 : -1.2

        const salesChange = Math.round((optimalPrice / item.currentPrice - 1) * priceElasticity * 100) / 100
        const optimalSales = Math.round(item.currentSales * (1 + salesChange))

        const currentRevenue = item.currentPrice * item.currentSales
        const optimalRevenue = optimalPrice * optimalSales

        const currentProfitValue = currentRevenue * (item.currentProfit / 100)
        const optimalProfitMargin = item.currentProfit + (optimalPrice / item.currentPrice - 1) * 15
        const optimalProfitValue = optimalRevenue * (optimalProfitMargin / 100)

        const profitChange = Math.round((optimalProfitValue / currentProfitValue - 1) * 100 * 10) / 10

        return {
          ...item,
          optimalPrice,
          priceChange: Math.round((optimalPrice / item.currentPrice - 1) * 100 * 10) / 10,
          optimalSales,
          salesChange: Math.round(salesChange * 100) / 100,
          optimalProfitMargin: Math.round(optimalProfitMargin * 10) / 10,
          profitChange,
        }
      })
    }

    setData(generateData())
  }, [marginTarget, salesVolumeTarget, competitorMatching, seasonalAdjustment])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" label={{ value: "价格 (¥)", angle: -90, position: "insideLeft" }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "利润变化 (%)", angle: 90, position: "insideRight" }}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "currentPrice" || name === "optimalPrice")
              return [`¥${value}`, name === "currentPrice" ? "当前价格" : "最优价格"]
            if (name === "priceChange" || name === "profitChange")
              return [`${value}%`, name === "priceChange" ? "价格变化" : "利润变化"]
            return [value, name]
          }}
        />
        <Legend
          payload={[
            { value: "当前价格", type: "line", color: "#8884d8" },
            { value: "最优价格", type: "line", color: "#82ca9d" },
            { value: "利润变化", type: "line", color: "#ff7300" },
          ]}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="currentPrice"
          name="当前价格"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="left" type="monotone" dataKey="optimalPrice" name="最优价格" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="profitChange" name="利润变化" stroke="#ff7300" />
        <ReferenceLine yAxisId="right" y={0} stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}
