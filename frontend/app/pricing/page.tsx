"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  RefreshCw,
  TrendingUp,
  DollarSign,
  BarChart4,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  Percent,
} from "lucide-react"
import PriceElasticityChart from "@/components/price-elasticity-chart"
import PricingOptimizationChart from "@/components/pricing-optimization-chart"

export default function PricingPage() {
  const [marginTarget, setMarginTarget] = useState<number[]>([25])
  const [salesVolumeTarget, setSalesVolumeTarget] = useState<number[]>([70])
  const [seasonalAdjustmentEnabled, setSeasonalAdjustmentEnabled] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">定价策略</h2>
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
              更新策略
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>

        <Tabs defaultValue="optimization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="optimization">价格优化</TabsTrigger>
            <TabsTrigger value="elasticity">价格弹性</TabsTrigger>
          </TabsList>

          <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">当前平均利润率</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23.4%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">+1.2%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">价格优化空间</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+8.7%</div>
                  <p className="text-xs text-muted-foreground">基于价格弹性分析</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计销量变化</CardTitle>
                  <BarChart4 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-3.2%</div>
                  <p className="text-xs text-muted-foreground">基于最优价格策略</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计收入增长</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+5.4%</div>
                  <p className="text-xs text-muted-foreground">基于最优价格策略</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">价格优化图表</CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  更新数据
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <PricingOptimizationChart
                    marginTarget={marginTarget[0]}
                    salesVolumeTarget={salesVolumeTarget[0]}
                    competitorMatching={false}
                    seasonalAdjustment={seasonalAdjustmentEnabled}
                  />
                </div>
              </CardContent>
            </Card>
            


            <Card>
              <CardHeader>
                <CardTitle>价格优化策略</CardTitle>
                <CardDescription>基于销售预测和价格弹性的最优定价策略</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>目标利润率: {marginTarget[0]}%</Label>
                        </div>
                        <Slider
                          defaultValue={[25]}
                          max={50}
                          min={5}
                          step={1}
                          value={marginTarget}
                          onValueChange={setMarginTarget}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>目标销量维持率: {salesVolumeTarget[0]}%</Label>
                        </div>
                        <Slider
                          defaultValue={[70]}
                          max={100}
                          min={50}
                          step={1}
                          value={salesVolumeTarget}
                          onValueChange={setSalesVolumeTarget}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="seasonal-adjustment"
                            checked={seasonalAdjustmentEnabled}
                            onCheckedChange={setSeasonalAdjustmentEnabled}
                          />
                          <Label htmlFor="seasonal-adjustment">启用季节性价格调整</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-2">最优定价策略摘要</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">平均价格调整:</span>
                            <span className="font-medium text-green-600">+6.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">预计利润增长:</span>
                            <span className="font-medium text-green-600">+12.3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">预计销量变化:</span>
                            <span className="font-medium text-red-500">-3.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">预计收入变化:</span>
                            <span className="font-medium text-green-600">+5.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">库存周转影响:</span>
                            <span className="font-medium text-green-600">+0.5</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 bg-primary/5">
                        <h3 className="text-lg font-medium mb-2">策略建议</h3>
                        <p className="text-sm">
                          根据当前的销售预测和价格弹性分析，建议对上装和外套类别进行适度提价，对连衣裙类别进行季节性促销，以优化整体利润并加速库存周转。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-2">调整参数影响</h3>
                    <p className="text-sm text-muted-foreground">
                      调整上方的参数可以实时查看对价格优化的影响。价格优化图表会根据您设置的目标利润率、销量目标以及是否启用竞争对手匹配和季节性调整等参数来显示最优价格点。
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>产品定价建议</CardTitle>
                <CardDescription>基于优化策略的具体产品定价建议</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品名称</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>当前价格</TableHead>
                      <TableHead>建议价格</TableHead>
                      <TableHead>价格变化</TableHead>
                      <TableHead>预计销量影响</TableHead>
                      <TableHead>预计利润影响</TableHead>
                      <TableHead>建议</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">男士休闲夹克</TableCell>
                      <TableCell>JK-M-001</TableCell>
                      <TableCell>¥399</TableCell>
                      <TableCell className="font-medium">¥429</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+7.5%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">-2.8%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+11.2%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">提价</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">女士连衣裙</TableCell>
                      <TableCell>DR-F-023</TableCell>
                      <TableCell>¥299</TableCell>
                      <TableCell className="font-medium">¥269</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">-10.0%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+15.3%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+5.8%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">促销</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">儿童T恤</TableCell>
                      <TableCell>TS-C-045</TableCell>
                      <TableCell>¥99</TableCell>
                      <TableCell className="font-medium">¥109</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+10.1%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">-4.2%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+13.7%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">提价</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">女士牛仔裤</TableCell>
                      <TableCell>JN-F-078</TableCell>
                      <TableCell>¥259</TableCell>
                      <TableCell className="font-medium">¥259</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">0.0%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">0.0%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">0.0%</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">维持</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">男士衬衫</TableCell>
                      <TableCell>SH-M-102</TableCell>
                      <TableCell>¥199</TableCell>
                      <TableCell className="font-medium">¥219</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+10.1%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-red-500">-3.8%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-500">+12.5%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">提价</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">应用所有建议</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="elasticity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>价格弹性分析</CardTitle>
                <CardDescription>分析价格变化对销量的影响</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <PriceElasticityChart />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">平均价格弹性</CardTitle>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-1.24</div>
                  <p className="text-xs text-muted-foreground">价格每上涨1%，销量下降1.24%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">最高弹性类别</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">连衣裙</div>
                  <p className="text-xs text-muted-foreground">
                    弹性系数: <span className="text-red-500">-2.31</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">最低弹性类别</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">外套</div>
                  <p className="text-xs text-muted-foreground">
                    弹性系数: <span className="text-green-500">-0.76</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>产品类别价格弹性</CardTitle>
                <CardDescription>各产品类别的价格弹性系数</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品类别</TableHead>
                      <TableHead>价格弹性系数</TableHead>
                      <TableHead>弹性类型</TableHead>
                      <TableHead>价格敏感度</TableHead>
                      <TableHead>定价建议</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">上装</TableCell>
                      <TableCell>-1.12</TableCell>
                      <TableCell>单位弹性</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          中等
                        </Badge>
                      </TableCell>
                      <TableCell>适度提价</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">下装</TableCell>
                      <TableCell>-1.35</TableCell>
                      <TableCell>弹性</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          中等
                        </Badge>
                      </TableCell>
                      <TableCell>谨慎提价</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">连衣裙</TableCell>
                      <TableCell>-2.31</TableCell>
                      <TableCell>高弹性</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          高
                        </Badge>
                      </TableCell>
                      <TableCell>降价促销</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">外套</TableCell>
                      <TableCell>-0.76</TableCell>
                      <TableCell>缺乏弹性</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          低
                        </Badge>
                      </TableCell>
                      <TableCell>大幅提价</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">配饰</TableCell>
                      <TableCell>-0.92</TableCell>
                      <TableCell>缺乏弹性</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          低
                        </Badge>
                      </TableCell>
                      <TableCell>适度提价</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  )
}
