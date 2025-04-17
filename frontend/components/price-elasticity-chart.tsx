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
  Scatter,
  ScatterChart,
  ZAxis,
  Cell
} from "recharts"

export default function PriceElasticityChart() {
  const [data, setData] = useState<any[]>([])
  const [scatterData, setScatterData] = useState<any[]>([])

  useEffect(() => {
    // 模拟数据生成，实际应用中应该从API获取
    const generateData = () => {
      // 价格弹性曲线数据
      const elasticityData = [
        { category: "上装", elasticity: -1.12, color: "#8884d8" },
        { category: "下装", elasticity: -1.35, color: "#82ca9d" },
        { category: "连衣裙", elasticity: -2.31, color: "#ff7300" },
        { category: "外套", elasticity: -0.76, color: "#0088fe" },
        { category: "配饰", elasticity: -0.92, color: "#00C49F" },
      ]

      // 为每个类别生成价格-销量关系曲线
      const curveData: any[] = []

      elasticityData.forEach((item) => {
        // 基准价格和销量
        const basePrice = 100
        const baseSales = 1000

        // 生成不同价格点的销量数据
        for (let priceChange = -30; priceChange <= 30; priceChange += 5) {
          const price = basePrice * (1 + priceChange / 100)
          // 根据弹性计算销量变化
          const salesChange = priceChange * item.elasticity
          const sales = baseSales * (1 + salesChange / 100)

          curveData.push({
            category: item.category,
            price,
            sales,
            priceChange,
            salesChange,
            color: item.color,
          })
        }
      })

      // 散点图数据 - 每个类别的弹性系数
      const scatterPoints = elasticityData.map((item) => ({
        x: -item.elasticity, // 转为正值以便于可视化
        y: item.category,
        z: 10,
        color: item.color,
        elasticity: item.elasticity,
      }))

      return { curveData, scatterPoints }
    }

    const { curveData, scatterPoints } = generateData()
    setData(curveData)
    setScatterData(scatterPoints)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="h-full">
        <h3 className="text-lg font-medium mb-2">价格-销量关系曲线</h3>
        <div className="h-[90%]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="price"
                name="价格"
                label={{ value: "价格 (¥)", position: "insideBottomRight", offset: -10 }}
                domain={[60, 140]}
              />
              <YAxis
                type="number"
                dataKey="sales"
                name="销量"
                label={{ value: "销量 (件)", angle: -90, position: "insideLeft" }}
                domain={[0, 2000]}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === "sales") return [`${Number(value).toFixed(0)}件`, "销量"]
                  if (name === "price") return [`¥${Number(value).toFixed(2)}`, "价格"]
                  return [value, name]
                }}
                labelFormatter={(label) => ""}
              />
              <Legend />
              {[...new Set(data.map((item) => item.category))].map((category, index) => {
                const color = data.find((item) => item.category === category)?.color
                return (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey="sales"
                    name={category}
                    stroke={color}
                    data={data.filter((item) => item.category === category)}
                    dot={false}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-full">
        <h3 className="text-lg font-medium mb-2">价格弹性系数比较</h3>
        <div className="h-[90%]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="弹性系数"
                label={{ value: "价格弹性系数 (绝对值)", position: "insideBottomRight", offset: -10 }}
                domain={[0, 3]}
              />
              <YAxis type="category" dataKey="y" name="类别" />
              <ZAxis type="number" dataKey="z" range={[100, 500]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name, props) => {
                  if (name === "x") return [props.payload.elasticity, "价格弹性系数"]
                  return [value, name]
                }}
                labelFormatter={(label) => label}
              />
              <Scatter name="价格弹性系数" data={scatterData} fill="#8884d8">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
