"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
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
  ZAxis,
} from "recharts"

// 模拟预测准确性数据
const accuracyData = [
  { category: "上装", MAPE: 8.5, RMSE: 245, MAE: 198, R2: 0.92 },
  { category: "下装", MAPE: 7.2, RMSE: 187, MAE: 156, R2: 0.94 },
  { category: "连衣裙", MAPE: 9.8, RMSE: 312, MAE: 267, R2: 0.89 },
  { category: "外套", MAPE: 12.4, RMSE: 378, MAE: 321, R2: 0.85 },
  { category: "配饰", MAPE: 6.5, RMSE: 98, MAE: 76, R2: 0.95 },
]

// 模拟预测与实际对比数据
const comparisonData = [
  { date: "2023-01", 预测值: 4200, 实际值: 4000, 误差: 5.0 },
  { date: "2023-02", 预测值: 3200, 实际值: 3000, 误差: 6.7 },
  { date: "2023-03", 预测值: 2100, 实际值: 2000, 误差: 5.0 },
  { date: "2023-04", 预测值: 2900, 实际值: 2780, 误差: 4.3 },
  { date: "2023-05", 预测值: 2000, 实际值: 1890, 误差: 5.8 },
  { date: "2023-06", 预测值: 2500, 实际值: 2390, 误差: 4.6 },
  { date: "2023-07", 预测值: 3600, 实际值: 3490, 误差: 3.2 },
  { date: "2023-08", 预测值: 4100, 实际值: 4000, 误差: 2.5 },
  { date: "2023-09", 预测值: 4700, 实际值: 4500, 误差: 4.4 },
  { date: "2023-10", 预测值: 5400, 实际值: 5200, 误差: 3.8 },
  { date: "2023-11", 预测值: 6200, 实际值: 6000, 误差: 3.3 },
  { date: "2023-12", 预测值: 7300, 实际值: 7000, 误差: 4.3 },
]

// 模拟误差分布数据
const errorDistributionData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 10 - 5, // 误差百分比，-5% 到 5%
  y: Math.random() * 5000 + 2000, // 销售额
  z: Math.random() * 10 + 5, // 点大小
}))

export default function ForecastAccuracyMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均绝对百分比误差 (MAPE)</CardTitle>
            <CardDescription>整体预测准确度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7%</div>
            <Progress value={91.3} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">准确率: 91.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">均方根误差 (RMSE)</CardTitle>
            <CardDescription>预测误差大小</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              较上月: <span className="text-green-500">-12</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均绝对误差 (MAE)</CardTitle>
            <CardDescription>平均误差大小</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <Progress value={88} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              较上月: <span className="text-green-500">-8</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">决定系数 (R²)</CardTitle>
            <CardDescription>模型拟合度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.91</div>
            <Progress value={91} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              较上月: <span className="text-green-500">+0.02</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>预测与实际销售对比</CardTitle>
          <CardDescription>过去12个月的预测值与实际值对比</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="预测值" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="实际值" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>各类别预测准确性</CardTitle>
            <CardDescription>按产品类别的预测准确性指标</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类别</TableHead>
                  <TableHead>MAPE (%)</TableHead>
                  <TableHead>RMSE</TableHead>
                  <TableHead>R²</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accuracyData.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.MAPE}%</TableCell>
                    <TableCell>{item.RMSE}</TableCell>
                    <TableCell>{item.R2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>预测误差分布</CardTitle>
            <CardDescription>预测误差与销售额的关系</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="误差百分比" unit="%" />
                <YAxis type="number" dataKey="y" name="销售额" unit="¥" />
                <ZAxis type="number" dataKey="z" range={[20, 200]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="预测误差分布" data={errorDistributionData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

