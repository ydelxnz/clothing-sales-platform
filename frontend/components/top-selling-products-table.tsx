"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data = [
  {
    id: 1,
    name: "女士夏季连衣裙",
    category: "连衣裙",
    price: "¥299",
    sales: 1245,
    growth: "+15.2%",
    status: "上升",
  },
  {
    id: 2,
    name: "男士休闲T恤",
    category: "上装",
    price: "¥99",
    sales: 987,
    growth: "+12.5%",
    status: "上升",
  },
  {
    id: 3,
    name: "女士牛仔裤",
    category: "下装",
    price: "¥199",
    sales: 876,
    growth: "+8.7%",
    status: "上升",
  },
  {
    id: 4,
    name: "男士休闲外套",
    category: "外套",
    price: "¥399",
    sales: 654,
    growth: "-2.3%",
    status: "下降",
  },
  {
    id: 5,
    name: "女士丝巾",
    category: "配饰",
    price: "¥59",
    sales: 543,
    growth: "+18.9%",
    status: "上升",
  },
  {
    id: 6,
    name: "儿童T恤",
    category: "上装",
    price: "¥79",
    sales: 432,
    growth: "+5.6%",
    status: "上升",
  },
  {
    id: 7,
    name: "男士衬衫",
    category: "上装",
    price: "¥159",
    sales: 421,
    growth: "-1.2%",
    status: "下降",
  },
  {
    id: 8,
    name: "女士短裤",
    category: "下装",
    price: "¥129",
    sales: 387,
    growth: "+9.4%",
    status: "上升",
  },
  {
    id: 9,
    name: "儿童连衣裙",
    category: "连衣裙",
    price: "¥159",
    sales: 354,
    growth: "+7.8%",
    status: "上升",
  },
  {
    id: 10,
    name: "女士帽子",
    category: "配饰",
    price: "¥49",
    sales: 321,
    growth: "+4.5%",
    status: "上升",
  },
]

export default function TopSellingProductsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>产品名称</TableHead>
          <TableHead>类别</TableHead>
          <TableHead>价格</TableHead>
          <TableHead className="text-right">销量</TableHead>
          <TableHead className="text-right">增长率</TableHead>
          <TableHead>趋势</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">{product.sales}</TableCell>
            <TableCell className="text-right">{product.growth}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  product.status === "上升" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                }
              >
                {product.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

