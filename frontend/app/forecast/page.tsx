"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, Download, RefreshCw, Settings } from "lucide-react"
import SalesForecastChart from "@/components/sales-forecast-chart"
import SeasonalityAnalysisChart from "@/components/seasonality-analysis-chart"
import ForecastAccuracyMetrics from "@/components/forecast-accuracy-metrics"

export default function ForecastPage() {
  const [forecastPeriod, setForecastPeriod] = useState<number[]>([30])
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">销售趋势预测</h2>
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
              更新预测
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出预测
            </Button>
          </div>
        </div>

        <Tabs defaultValue="forecast" className="space-y-4">
          <TabsList>
            <TabsTrigger value="forecast">销售预测</TabsTrigger>
            <TabsTrigger value="seasonality">季节性分析</TabsTrigger>
            <TabsTrigger value="accuracy">预测准确性</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>销售趋势预测</CardTitle>
                    <CardDescription>基于 Prophet 模型的未来销售趋势预测</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="confidence-interval"
                        checked={showConfidenceInterval}
                        onCheckedChange={setShowConfidenceInterval}
                      />
                      <Label htmlFor="confidence-interval">显示置信区间</Label>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 grid-cols-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>预测周期 (天): {forecastPeriod[0]}</Label>
                      </div>
                      <Slider
                        defaultValue={[30]}
                        max={180}
                        min={7}
                        step={1}
                        value={forecastPeriod}
                        onValueChange={setForecastPeriod}
                      />
                    </div>
                  </div>
                  <div className="h-[500px]">
                    <SalesForecastChart
                      forecastDays={forecastPeriod[0]}
                      showConfidenceInterval={showConfidenceInterval}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计30天销售额</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">¥523,489.50</div>
                  <p className="text-xs text-muted-foreground">
                    较上月预测 <span className="text-green-500">+14.2%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预计增长率</CardTitle>
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.7%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月预测 <span className="text-green-500">+2.3%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">预测置信度</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.5%</div>
                  <p className="text-xs text-muted-foreground">基于历史数据准确性</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seasonality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>季节性分析</CardTitle>
                <CardDescription>分析销售数据中的季节性模式和趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <SeasonalityAnalysisChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>预测准确性评估</CardTitle>
                <CardDescription>评估预测模型的准确性和性能</CardDescription>
              </CardHeader>
              <CardContent>
                <ForecastAccuracyMetrics />
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  )
}

