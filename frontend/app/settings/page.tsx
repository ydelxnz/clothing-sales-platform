"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { LineChart, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              保存设置
            </Button>
          </div>
        </div>

        <Tabs defaultValue="model" className="space-y-4">
          <TabsList>
            <TabsTrigger value="model">模型配置</TabsTrigger>
          </TabsList>
          
          <TabsContent value="model" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prophet 模型参数设置</CardTitle>
                <CardDescription>调整 Prophet 模型参数以优化预测效果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">基础参数设置</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="training-period">训练数据周期 (天)</Label>
                        <Input id="training-period" type="number" defaultValue="365" min="30" max="1095" />
                        <p className="text-xs text-muted-foreground">用于训练模型的历史数据天数</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="forecast-period">预测周期 (天)</Label>
                        <Input id="forecast-period" type="number" defaultValue="90" min="7" max="365" />
                        <p className="text-xs text-muted-foreground">模型预测的未来天数</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confidence-interval">置信区间 (%)</Label>
                        <Input id="confidence-interval" type="number" defaultValue="80" min="50" max="99" />
                        <p className="text-xs text-muted-foreground">预测结果的置信区间宽度</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="retraining-frequency">模型重训练频率</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="retraining-frequency">
                            <SelectValue placeholder="选择频率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">每日</SelectItem>
                            <SelectItem value="weekly">每周</SelectItem>
                            <SelectItem value="monthly">每月</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">模型自动重训练的频率</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">季节性参数</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="yearly-seasonality">年度季节性</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger id="yearly-seasonality">
                            <SelectValue placeholder="选择模式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">自动检测</SelectItem>
                            <SelectItem value="true">启用</SelectItem>
                            <SelectItem value="false">禁用</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">是否考虑年度季节性因素</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weekly-seasonality">周度季节性</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger id="weekly-seasonality">
                            <SelectValue placeholder="选择模式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">自动检测</SelectItem>
                            <SelectItem value="true">启用</SelectItem>
                            <SelectItem value="false">禁用</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">是否考虑周度季节性因素</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="daily-seasonality">日内季节性</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger id="daily-seasonality">
                            <SelectValue placeholder="选择模式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">自动检测</SelectItem>
                            <SelectItem value="true">启用</SelectItem>
                            <SelectItem value="false">禁用</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">是否考虑日内季节性因素</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seasonality-mode">季节性模式</Label>
                        <Select defaultValue="additive">
                          <SelectTrigger id="seasonality-mode">
                            <SelectValue placeholder="选择模式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="additive">加法模式</SelectItem>
                            <SelectItem value="multiplicative">乘法模式</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">季节性效应的计算方式</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">节假日设置</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>中国法定节假日</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="spring-festival" defaultChecked />
                            <Label htmlFor="spring-festival">春节</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="national-day" defaultChecked />
                            <Label htmlFor="national-day">国庆节</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="labor-day" defaultChecked />
                            <Label htmlFor="labor-day">劳动节</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mid-autumn" defaultChecked />
                            <Label htmlFor="mid-autumn">中秋节</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="dragon-boat" defaultChecked />
                            <Label htmlFor="dragon-boat">端午节</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>促销活动</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="618" defaultChecked />
                            <Label htmlFor="618">618购物节</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="1111" defaultChecked />
                            <Label htmlFor="1111">双十一</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">高级设置</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="changepoint-prior-scale-auto" defaultChecked />
                        <Label htmlFor="changepoint-prior-scale-auto">自动调整变点先验规模</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="changepoint-prior-scale">变点先验规模</Label>
                        <Input id="changepoint-prior-scale" type="number" defaultValue="0.05" min="0.001" max="0.5" step="0.001" disabled />
                        <p className="text-xs text-muted-foreground">控制趋势灵活性的参数，值越大趋势越灵活</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model-notes">模型调优笔记</Label>
                        <Textarea id="model-notes" placeholder="记录模型调优过程和参数变更..." className="min-h-[100px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  重置为默认值
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  保存模型配置
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
