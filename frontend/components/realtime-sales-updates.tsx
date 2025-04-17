"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingBag, Clock } from "lucide-react"

type SalesUpdate = {
  id: number
  product: string
  amount: string
  location: string
  time: string
}

export default function RealtimeSalesUpdates() {
  const [updates, setUpdates] = useState<SalesUpdate[]>([])
  const [connected, setConnected] = useState(false)

  // 模拟SSE连接
  useEffect(() => {
    setConnected(true)

    // 初始数据
    const initialUpdates: SalesUpdate[] = [
      {
        id: 1,
        product: "女士夏季连衣裙",
        amount: "¥299",
        location: "北京",
        time: "刚刚",
      },
      {
        id: 2,
        product: "男士休闲T恤",
        amount: "¥99",
        location: "上海",
        time: "1分钟前",
      },
      {
        id: 3,
        product: "女士牛仔裤",
        amount: "¥199",
        location: "广州",
        time: "2分钟前",
      },
    ]

    setUpdates(initialUpdates)

    // 模拟实时数据更新
    const interval = setInterval(() => {
      const locations = ["北京", "上海", "广州", "深圳", "成都", "杭州", "武汉", "西安"]
      const products = [
        "女士夏季连衣裙",
        "男士休闲T恤",
        "女士牛仔裤",
        "男士休闲外套",
        "女士丝巾",
        "儿童T恤",
        "男士衬衫",
        "女士短裤",
      ]
      const prices = ["¥99", "¥159", "¥199", "¥299", "¥399", "¥59", "¥79", "¥129"]

      const newUpdate: SalesUpdate = {
        id: Date.now(),
        product: products[Math.floor(Math.random() * products.length)],
        amount: prices[Math.floor(Math.random() * prices.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: "刚刚",
      }

      // 更新时间
      const updatedUpdates = updates
        .map((update, index) => {
          if (index === 0) {
            return { ...update, time: "1分钟前" }
          } else if (index === 1) {
            return { ...update, time: "2分钟前" }
          } else if (index === 2) {
            return { ...update, time: "3分钟前" }
          } else if (index > 10) {
            return null // 移除旧的更新
          }
          return update
        })
        .filter(Boolean) as SalesUpdate[]

      setUpdates([newUpdate, ...updatedUpdates].slice(0, 20))
    }, 5000)

    return () => {
      clearInterval(interval)
      setConnected(false)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant={connected ? "default" : "destructive"} className="px-2 py-1">
            {connected ? "已连接" : "未连接"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {connected ? "正在接收实时销售数据" : "未连接到实时数据流"}
          </span>
        </div>
      </div>

      <ScrollArea className="h-[400px] rounded-md border">
        {updates.map((update) => (
          <Card key={update.id} className="mb-2 mx-2">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{update.product}</p>
                  <p className="text-sm text-muted-foreground">{update.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{update.amount}</p>
                <div className="flex items-center justify-end text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {update.time}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

