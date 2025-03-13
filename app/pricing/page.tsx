"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, RefreshCw, DollarSign, TrendingUp, BarChart } from "lucide-react"
import PriceElasticityChart from "@/components/price-elasticity-chart"
import PriceOptimizationChart from "@/components/price-optimization-chart"
import CompetitorPriceComparison from "@/components/competitor-price-comparison"

export default function PricingPage() {
  const [priceRange, setPriceRange] = useState<number[]>([100])
  const [discountRange, setDiscountRange] = useState<number[]>([20])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">定价策略优化</h2>
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择产品类别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有类别</SelectItem>
                <SelectItem value="tops">上装</SelectItem>
                <SelectItem value="bottoms">下装</SelectItem>
                <SelectItem value="dresses">连衣裙</SelectItem>
                <SelectItem value="outerwear">外套</SelectItem>
                <SelectItem value="accessories">配饰</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              更新建议
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出策略
            </Button>
          </div>
        </div>

        <Tabs defaultValue="optimization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="optimization">价格优化</TabsTrigger>
            <TabsTrigger value="elasticity">价格弹性</TabsTrigger>
            <TabsTrigger value="competitor">竞争对手分析</TabsTrigger>
            <TabsTrigger value="simulation">定价模拟</TabsTrigger>
          </TabsList>

          <TabsContent value="optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>季节性促销定价优化</CardTitle>
                <CardDescription>基于销售预测和市场数据的最优定价建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>基准价格 (¥): {priceRange[0]}</Label>
                      </div>
                      <Slider
                        defaultValue={[100]}
                        max={500}
                        min={10}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>折扣幅度 (%): {discountRange[0]}</Label>
                      </div>
                      <Slider
                        defaultValue={[20]}
                        max={70}
                        min={0}
                        step={1}
                        value={discountRange}
                        onValueChange={setDiscountRange}
                      />
                    </div>
                  </div>
                  <div className="h-[400px]">
                    <PriceOptimizationChart basePrice={priceRange[0]} discountPercentage={discountRange[0]} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">建议定价</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥{Math.round(priceRange[0] * (1 - discountRange[0] / 100))}</div>
                  <p className="text-xs text-muted-foreground">
                    折扣: <span className="text-green-500">{discountRange[0]}%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计销量增长</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(discountRange[0] * 0.8)}%</div>
                  <p className="text-xs text-muted-foreground">基于历史促销数据</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计利润率</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(45 - discountRange[0] * 0.3)}%</div>
                  <p className="text-xs text-muted-foreground">
                    较标准利润率{" "}
                    <span className={discountRange[0] > 30 ? "text-red-500" : "text-green-500"}>
                      {discountRange[0] > 30 ? "-" : "+"}
                      {Math.abs(Math.round(15 - discountRange[0] * 0.5))}%
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>产品定价建议</CardTitle>
                <CardDescription>基于销售预测和季节性分析的产品定价建议</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品类别</TableHead>
                      <TableHead>当前价格</TableHead>
                      <TableHead>建议价格</TableHead>
                      <TableHead>折扣幅度</TableHead>
                      <TableHead>预计销量增长</TableHead>
                      <TableHead>预计利润变化</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">夏季连衣裙</TableCell>
                      <TableCell>¥299</TableCell>
                      <TableCell>¥239</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell className="text-green-500">+18%</TableCell>
                      <TableCell className="text-green-500">+12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">轻薄外套</TableCell>
                      <TableCell>¥399</TableCell>
                      <TableCell>¥319</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell className="text-green-500">+15%</TableCell>
                      <TableCell className="text-green-500">+8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">休闲裤装</TableCell>
                      <TableCell>¥199</TableCell>
                      <TableCell>¥159</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell className="text-green-500">+22%</TableCell>
                      <TableCell className="text-green-500">+14%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">T恤衫</TableCell>
                      <TableCell>¥99</TableCell>
                      <TableCell>¥69</TableCell>
                      <TableCell>30%</TableCell>
                      <TableCell className="text-green-500">+35%</TableCell>
                      <TableCell className="text-green-500">+5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">配饰</TableCell>
                      <TableCell>¥59</TableCell>
                      <TableCell>¥47</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell className="text-green-500">+25%</TableCell>
                      <TableCell className="text-green-500">+18%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">应用建议价格</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="elasticity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>价格弹性分析</CardTitle>
                <CardDescription>分析价格变动对销量的影响</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <PriceElasticityChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>竞争对手价格分析</CardTitle>
                <CardDescription>与主要竞争对手的价格对比分析</CardDescription>
              </CardHeader>
              <CardContent>
                <CompetitorPriceComparison />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>定价策略模拟</CardTitle>
                <CardDescription>模拟不同定价策略对销售和利润的影响</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="base-price">基准价格 (¥)</Label>
                      <Input id="base-price" type="number" defaultValue="100" />
                    </div>
                    <div>
                      <Label htmlFor="discount">折扣幅度 (%)</Label>
                      <Input id="discount" type="number" defaultValue="20" />
                    </div>
                    <div>
                      <Label htmlFor="promotion-period">促销周期 (天)</Label>
                      <Input id="promotion-period" type="number" defaultValue="30" />
                    </div>
                    <div>
                      <Label htmlFor="target-audience">目标客群</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="target-audience">
                          <SelectValue placeholder="选择目标客群" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">所有客户</SelectItem>
                          <SelectItem value="new">新客户</SelectItem>
                          <SelectItem value="returning">回头客</SelectItem>
                          <SelectItem value="vip">VIP客户</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>运行模拟</Button>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">模拟结果将在此显示</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

