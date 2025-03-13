"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export default function ForecastParametersForm() {
  const [changePointPrior, setChangePointPrior] = useState<number[]>([0.05])
  const [seasonalityPrior, setSeasonalityPrior] = useState<number[]>([10])
  const [includeHolidays, setIncludeHolidays] = useState(true)
  const [includeWeeklySeasonality, setIncludeWeeklySeasonality] = useState(true)
  const [includeYearlySeasonality, setIncludeYearlySeasonality] = useState(true)
  const [includeMonthlySeasonality, setIncludeMonthlySeasonality] = useState(false)

  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">基本参数</TabsTrigger>
        <TabsTrigger value="advanced">高级参数</TabsTrigger>
        <TabsTrigger value="seasonality">季节性设置</TabsTrigger>
        <TabsTrigger value="holidays">节假日设置</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="forecast-periods">预测周期 (天)</Label>
              <Input id="forecast-periods" type="number" defaultValue="30" />
              <p className="text-xs text-muted-foreground">设置需要预测的未来天数</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="history-periods">历史数据周期 (天)</Label>
              <Input id="history-periods" type="number" defaultValue="365" />
              <p className="text-xs text-muted-foreground">用于训练模型的历史数据天数</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidence-interval">置信区间 (%)</Label>
              <Input id="confidence-interval" type="number" defaultValue="80" />
              <p className="text-xs text-muted-foreground">预测结果的置信区间宽度</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="forecast-frequency">预测频率</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="forecast-frequency">
                  <SelectValue placeholder="选择预测频率" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">每日</SelectItem>
                  <SelectItem value="weekly">每周</SelectItem>
                  <SelectItem value="monthly">每月</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">预测结果的时间粒度</p>
            </div>
          </div>
          <Button>应用基本参数</Button>
        </div>
      </TabsContent>

      <TabsContent value="advanced">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>变点先验尺度 (changepoint_prior_scale): {changePointPrior[0]}</Label>
            </div>
            <Slider
              defaultValue={[0.05]}
              max={0.5}
              min={0.001}
              step={0.001}
              value={changePointPrior}
              onValueChange={setChangePointPrior}
            />
            <p className="text-xs text-muted-foreground">控制趋势灵活性，值越大趋势变化越灵活</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>季节性先验尺度 (seasonality_prior_scale): {seasonalityPrior[0]}</Label>
            </div>
            <Slider
              defaultValue={[10]}
              max={50}
              min={0.01}
              step={0.01}
              value={seasonalityPrior}
              onValueChange={setSeasonalityPrior}
            />
            <p className="text-xs text-muted-foreground">控制季节性强度，值越大季节性影响越强</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="changepoint-range">变点范围 (changepoint_range)</Label>
              <Input id="changepoint-range" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
              <p className="text-xs text-muted-foreground">确定在历史数据的哪个比例范围内放置潜在变点</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcmc-samples">MCMC样本数 (mcmc_samples)</Label>
              <Input id="mcmc-samples" type="number" defaultValue="0" />
              <p className="text-xs text-muted-foreground">用于不确定性估计的MCMC样本数，0表示禁用</p>
            </div>
          </div>

          <Button>应用高级参数</Button>
        </div>
      </TabsContent>

      <TabsContent value="seasonality">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>季节性组件设置</CardTitle>
              <CardDescription>控制模型中包含的季节性组件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekly-seasonality"
                  checked={includeWeeklySeasonality}
                  onCheckedChange={(checked) => setIncludeWeeklySeasonality(checked as boolean)}
                />
                <Label htmlFor="weekly-seasonality">包含周季节性</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="yearly-seasonality"
                  checked={includeYearlySeasonality}
                  onCheckedChange={(checked) => setIncludeYearlySeasonality(checked as boolean)}
                />
                <Label htmlFor="yearly-seasonality">包含年季节性</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monthly-seasonality"
                  checked={includeMonthlySeasonality}
                  onCheckedChange={(checked) => setIncludeMonthlySeasonality(checked as boolean)}
                />
                <Label htmlFor="monthly-seasonality">包含月季节性</Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="weekly-fourier">周季节性傅里叶项</Label>
                  <Input id="weekly-fourier" type="number" defaultValue="3" min="1" max="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearly-fourier">年季节性傅里叶项</Label>
                  <Input id="yearly-fourier" type="number" defaultValue="10" min="1" max="20" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button>应用季节性设置</Button>
        </div>
      </TabsContent>

      <TabsContent value="holidays">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>节假日效应设置</CardTitle>
              <CardDescription>控制模型中包含的节假日效应</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="include-holidays" checked={includeHolidays} onCheckedChange={setIncludeHolidays} />
                <Label htmlFor="include-holidays">包含节假日效应</Label>
              </div>

              <div className="space-y-2 mt-4">
                <Label>选择要包含的节假日</Label>
                <div className="grid gap-2 md:grid-cols-2">
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-year" defaultChecked />
                    <Label htmlFor="new-year">元旦</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="singles-day" defaultChecked />
                    <Label htmlFor="singles-day">双十一</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="618" defaultChecked />
                    <Label htmlFor="618">618购物节</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="holiday-prior-scale">节假日先验尺度</Label>
                <Input id="holiday-prior-scale" type="number" defaultValue="10" step="0.1" min="0.1" />
                <p className="text-xs text-muted-foreground">控制节假日效应的强度，值越大节假日影响越强</p>
              </div>
            </CardContent>
          </Card>

          <Button>应用节假日设置</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

