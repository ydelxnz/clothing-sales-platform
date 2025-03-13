"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Database, Globe, LineChart, Save, RefreshCw, Upload, Download, Key } from "lucide-react"

export default function SettingsPage() {
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState<number[]>([90])
  const [apiRateLimit, setApiRateLimit] = useState<number[]>([50])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              保存所有设置
            </Button>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">账户设置</TabsTrigger>
            <TabsTrigger value="system">系统偏好</TabsTrigger>
            <TabsTrigger value="notifications">通知设置</TabsTrigger>
            <TabsTrigger value="data">数据管理</TabsTrigger>
            <TabsTrigger value="api">API设置</TabsTrigger>
            <TabsTrigger value="model">模型配置</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>管理您的账户信息和偏好设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" defaultValue="张三" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">电子邮箱</Label>
                    <Input id="email" type="email" defaultValue="zhangsan@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">职位</Label>
                    <Input id="title" defaultValue="销售经理" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">部门</Label>
                    <Input id="department" defaultValue="销售部" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>保存个人资料</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>管理您的密码和安全选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">当前密码</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">启用两步验证</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>更新密码</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>系统偏好设置</CardTitle>
                <CardDescription>自定义系统界面和行为</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">界面语言</Label>
                  <Select defaultValue="zh-CN">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">界面主题</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="选择主题" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">浅色</SelectItem>
                      <SelectItem value="dark">深色</SelectItem>
                      <SelectItem value="system">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select defaultValue="Asia/Shanghai">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="选择时区" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                      <SelectItem value="America/New_York">东部标准时间 (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">格林威治标准时间 (UTC+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">日期格式</Label>
                  <Select defaultValue="yyyy-MM-dd">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="选择日期格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="auto-refresh" defaultChecked />
                  <Label htmlFor="auto-refresh">启用数据自动刷新</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="animations" defaultChecked />
                  <Label htmlFor="animations">启用界面动画</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>保存偏好设置</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>管理系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">电子邮件通知</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="email-sales-alert" defaultChecked />
                          <Label htmlFor="email-sales-alert">销售异常提醒</Label>
                        </div>
                        <Select defaultValue="immediate">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="选择频率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">立即</SelectItem>
                            <SelectItem value="daily">每日摘要</SelectItem>
                            <SelectItem value="weekly">每周摘要</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="email-inventory-alert" defaultChecked />
                          <Label htmlFor="email-inventory-alert">库存预警</Label>
                        </div>
                        <Select defaultValue="immediate">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="选择频率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">立即</SelectItem>
                            <SelectItem value="daily">每日摘要</SelectItem>
                            <SelectItem value="weekly">每周摘要</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="email-forecast-update" defaultChecked />
                          <Label htmlFor="email-forecast-update">预测更新</Label>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="选择频率" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">立即</SelectItem>
                            <SelectItem value="daily">每日摘要</SelectItem>
                            <SelectItem value="weekly">每周摘要</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">系统内通知</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="system-sales-alert" defaultChecked />
                        <Label htmlFor="system-sales-alert">销售异常提醒</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="system-inventory-alert" defaultChecked />
                        <Label htmlFor="system-inventory-alert">库存预警</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="system-forecast-update" defaultChecked />
                        <Label htmlFor="system-forecast-update">预测更新</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="system-price-recommendation" defaultChecked />
                        <Label htmlFor="system-price-recommendation">价格建议</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>保存通知设置</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>数据管理</CardTitle>
                <CardDescription>管理系统数据和备份</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>数据保留期限 (天): {dataRetentionPeriod[0]}</Label>
                  </div>
                  <Slider
                    defaultValue={[90]}
                    max={365}
                    min={30}
                    step={1}
                    value={dataRetentionPeriod}
                    onValueChange={setDataRetentionPeriod}
                  />
                  <p className="text-xs text-muted-foreground">设置系统保留历史数据的时间长度</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">数据导入</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="import-type">数据类型</Label>
                        <Select defaultValue="sales">
                          <SelectTrigger id="import-type">
                            <SelectValue placeholder="选择数据类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">销售数据</SelectItem>
                            <SelectItem value="inventory">库存数据</SelectItem>
                            <SelectItem value="products">产品数据</SelectItem>
                            <SelectItem value="customers">客户数据</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          选择文件并导入
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">数据导出</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="export-type">数据类型</Label>
                        <Select defaultValue="sales">
                          <SelectTrigger id="export-type">
                            <SelectValue placeholder="选择数据类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">销售数据</SelectItem>
                            <SelectItem value="inventory">库存数据</SelectItem>
                            <SelectItem value="products">产品数据</SelectItem>
                            <SelectItem value="forecast">预测数据</SelectItem>
                            <SelectItem value="all">所有数据</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          导出数据
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">数据备份计划</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>备份类型</TableHead>
                        <TableHead>频率</TableHead>
                        <TableHead>保留期限</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>上次备份时间</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">完整备份</TableCell>
                        <TableCell>每周日</TableCell>
                        <TableCell>30天</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">正常</Badge>
                        </TableCell>
                        <TableCell>2023-07-09 03:15</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            立即备份
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">增量备份</TableCell>
                        <TableCell>每日</TableCell>
                        <TableCell>7天</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">正常</Badge>
                        </TableCell>
                        <TableCell>2023-07-15 03:15</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            立即备份
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button>保存数据设置</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API设置</CardTitle>
                <CardDescription>管理API访问和集成</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>API请求速率限制 (每分钟): {apiRateLimit[0]}</Label>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={200}
                    min={10}
                    step={1}
                    value={apiRateLimit}
                    onValueChange={setApiRateLimit}
                  />
                  <p className="text-xs text-muted-foreground">设置API请求的速率限制</p>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">API密钥</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>密钥名称</TableHead>
                        <TableHead>创建时间</TableHead>
                        <TableHead>上次使用</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">主要API密钥</TableCell>
                        <TableCell>2023-05-10</TableCell>
                        <TableCell>2023-07-15</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">活跃</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Key className="h-4 w-4 mr-1" />
                              查看
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              重新生成
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">只读API密钥</TableCell>
                        <TableCell>2023-06-15</TableCell>
                        <TableCell>2023-07-14</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">活跃</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Key className="h-4 w-4 mr-1" />
                              查看
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              重新生成
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button className="mt-4">
                    <Key className="mr-2 h-4 w-4" />
                    创建新API密钥
                  </Button>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-4">外部系统集成</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <Globe className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">ERP系统集成</h4>
                          <p className="text-sm text-muted-foreground">连接到企业资源规划系统</p>
                        </div>
                      </div>
                      <Switch id="erp-integration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <Database className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">CRM系统集成</h4>
                          <p className="text-sm text-muted-foreground">连接到客户关系管理系统</p>
                        </div>
                      </div>
                      <Switch id="crm-integration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <LineChart className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">BI系统集成</h4>
                          <p className="text-sm text-muted-foreground">连接到商业智能系统</p>
                        </div>
                      </div>
                      <Switch id="bi-integration" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>保存API设置</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="model" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prophet模型配置</CardTitle>
                <CardDescription>配置销售预测模型参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="changepoint-prior-scale">变点先验尺度 (changepoint_prior_scale)</Label>
                    <Input
                      id="changepoint-prior-scale"
                      type="number"
                      defaultValue="0.05"
                      step="0.01"
                      min="0.001"
                      max="0.5"
                    />
                    <p className="text-xs text-muted-foreground">控制趋势灵活性，值越大趋势变化越灵活</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seasonality-prior-scale">季节性先验尺度 (seasonality_prior_scale)</Label>
                    <Input
                      id="seasonality-prior-scale"
                      type="number"
                      defaultValue="10"
                      step="0.1"
                      min="0.01"
                      max="50"
                    />
                    <p className="text-xs text-muted-foreground">控制季节性强度，值越大季节性影响越强</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="holidays-prior-scale">节假日先验尺度 (holidays_prior_scale)</Label>
                    <Input id="holidays-prior-scale" type="number" defaultValue="10" step="0.1" min="0.01" max="50" />
                    <p className="text-xs text-muted-foreground">控制节假日效应的强度，值越大节假日影响越强</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="changepoint-range">变点范围 (changepoint_range)</Label>
                    <Input id="changepoint-range" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
                    <p className="text-xs text-muted-foreground">确定在历史数据的哪个比例范围内放置潜在变点</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">季节性组件设置</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekly-seasonality" defaultChecked />
                      <Label htmlFor="weekly-seasonality">包含周季节性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="yearly-seasonality" defaultChecked />
                      <Label htmlFor="yearly-seasonality">包含年季节性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="monthly-seasonality" />
                      <Label htmlFor="monthly-seasonality">包含月季节性</Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">节假日效应设置</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-holidays" defaultChecked />
                      <Label htmlFor="include-holidays">包含节假日效应</Label>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3 mt-2">
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
                        <Checkbox id="singles-day" defaultChecked />
                        <Label htmlFor="singles-day">双十一</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">模型训练设置</h3>
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
                  <h3 className="text-lg font-medium mb-4">高级设置</h3>
                  <div className="space-y-2">
                    <Label htmlFor="model-notes">模型调优笔记</Label>
                    <Textarea id="model-notes" placeholder="记录模型调优过程和参数变更..." className="min-h-[100px]" />
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

