"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import InventoryLevelChart from "@/components/inventory-level-chart"
import InventoryTurnoverChart from "@/components/inventory-turnover-chart"
import StockOptimizationRecommendations from "@/components/stock-optimization-recommendations"

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">库存管理优化</h2>
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择仓库" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有仓库</SelectItem>
                <SelectItem value="north">北方仓库</SelectItem>
                <SelectItem value="south">南方仓库</SelectItem>
                <SelectItem value="east">东部仓库</SelectItem>
                <SelectItem value="west">西部仓库</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              更新数据
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">库存概览</TabsTrigger>
            <TabsTrigger value="turnover">周转分析</TabsTrigger>
            <TabsTrigger value="optimization">库存优化</TabsTrigger>
            <TabsTrigger value="alerts">库存预警</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">总库存价值</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥2,345,678</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-red-500">+5.2%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">库存周转率</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-red-500">-0.3</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">库存商品数</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,584</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">-2.3%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">库存预警数</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">-8</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>库存水平趋势</CardTitle>
                <CardDescription>各类别库存水平变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <InventoryLevelChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>库存状态概览</CardTitle>
                <CardDescription>按产品类别的库存状态</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品类别</TableHead>
                      <TableHead>库存数量</TableHead>
                      <TableHead>库存价值</TableHead>
                      <TableHead>周转率</TableHead>
                      <TableHead>库存状态</TableHead>
                      <TableHead>建议操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">上装</TableCell>
                      <TableCell>3,245</TableCell>
                      <TableCell>¥648,900</TableCell>
                      <TableCell>5.2</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">正常</Badge>
                      </TableCell>
                      <TableCell>维持当前库存</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">下装</TableCell>
                      <TableCell>2,876</TableCell>
                      <TableCell>¥575,200</TableCell>
                      <TableCell>4.8</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">正常</Badge>
                      </TableCell>
                      <TableCell>维持当前库存</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">连衣裙</TableCell>
                      <TableCell>1,543</TableCell>
                      <TableCell>¥462,900</TableCell>
                      <TableCell>3.5</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">偏高</Badge>
                      </TableCell>
                      <TableCell>促销清库</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">外套</TableCell>
                      <TableCell>987</TableCell>
                      <TableCell>¥394,800</TableCell>
                      <TableCell>2.1</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">过高</Badge>
                      </TableCell>
                      <TableCell>大幅度促销</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">配饰</TableCell>
                      <TableCell>3,933</TableCell>
                      <TableCell>¥235,980</TableCell>
                      <TableCell>6.7</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">偏低</Badge>
                      </TableCell>
                      <TableCell>适量补货</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="turnover" className="space-y-4">
            <Card className="min-h-[700px]">
              <CardHeader>
                <CardTitle>库存周转分析</CardTitle>
                <CardDescription>各产品类别的库存周转率分析</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <div className="h-auto">
                  <InventoryTurnoverChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>库存优化建议</CardTitle>
                <CardDescription>基于销售预测的库存优化建议</CardDescription>
              </CardHeader>
              <CardContent>
                <StockOptimizationRecommendations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>库存预警</CardTitle>
                <CardDescription>需要关注的库存异常情况</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>产品名称</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>当前库存</TableHead>
                      <TableHead>预警类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>建议操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">男士休闲夹克</TableCell>
                      <TableCell>JK-M-001</TableCell>
                      <TableCell>245</TableCell>
                      <TableCell className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        库存过高
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          紧急
                        </Badge>
                      </TableCell>
                      <TableCell>促销清库</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">女士连衣裙</TableCell>
                      <TableCell>DR-F-023</TableCell>
                      <TableCell>187</TableCell>
                      <TableCell className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                        滞销风险
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          警告
                        </Badge>
                      </TableCell>
                      <TableCell>降价促销</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">儿童T恤</TableCell>
                      <TableCell>TS-C-045</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        库存不足
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          紧急
                        </Badge>
                      </TableCell>
                      <TableCell>立即补货</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">女士牛仔裤</TableCell>
                      <TableCell>JN-F-078</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell className="flex items-center">
                        <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                        即将缺货
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          警告
                        </Badge>
                      </TableCell>
                      <TableCell>计划补货</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">男士衬衫</TableCell>
                      <TableCell>SH-M-102</TableCell>
                      <TableCell>156</TableCell>
                      <TableCell className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        库存正常
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          正常
                        </Badge>
                      </TableCell>
                      <TableCell>无需操作</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">处理所有预警</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

