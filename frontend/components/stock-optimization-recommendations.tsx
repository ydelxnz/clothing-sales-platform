"\"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"

// 模拟库存优化建议数据
const recommendations = [
  {
    product: "男士休闲夹克",
    sku: "JK-M-001",
    currentStock: 245,
    recommendedStock: 180,
    action: "减少库存",
    reason: "季节性需求下降",
    impact: "降低库存积压风险",
    status: "高库存",
  },
  {
    product: "女士连衣裙",
    sku: "DR-F-023",
    currentStock: 187,
    recommendedStock: 250,
    action: "增加库存",
    reason: "夏季促销活动",
    impact: "满足市场需求",
    status: "库存不足",
  },
  {
    product: "儿童T恤",
    sku: "TS-C-045",
    currentStock: 12,
    recommendedStock: 50,
    action: "紧急补货",
    reason: "销量超出预期",
    impact: "避免缺货损失",
    status: "严重缺货",
  },
  {
    product: "女士牛仔裤",
    sku: "JN-F-078",
    currentStock: 35,
    recommendedStock: 80,
    action: "适量补货",
    reason: "持续热销",
    impact: "增加销售机会",
    status: "库存偏低",
  },
  {
    product: "男士衬衫",
    sku: "SH-M-102",
    currentStock: 156,
    recommendedStock: 120,
    action: "促销清仓",
    reason: "库存积压",
    impact: "释放资金占用",
    status: "库存积压",
  },
]

export default function StockOptimizationRecommendations() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>产品名称</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>当前库存</TableHead>
            <TableHead>建议库存</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>原因</TableHead>
            <TableHead>影响</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recommendations.map((item) => (
            <TableRow key={item.sku}>
              <TableCell className="font-medium">{item.product}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.currentStock}</TableCell>
              <TableCell>{item.recommendedStock}</TableCell>
              <TableCell>
                {item.action === "增加库存" || item.action === "紧急补货" ? (
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    {item.action}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    {item.action}
                  </div>
                )}
              </TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.impact}</TableCell>
              <TableCell>
                {item.status === "库存积压" || item.status === "严重缺货" || item.status === "高库存" ? (
                  <Badge variant="destructive">{item.status}</Badge>
                ) : (
                  <Badge variant="outline">{item.status}</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

