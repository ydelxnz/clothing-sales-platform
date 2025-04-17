"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Clock,
  Settings,
  ArrowRight,
  LineChart,
  Zap,
  BarChart3,  
} from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])


  const testimonials = [
    {
      quote: "Prophet 驱动的定价策略帮助我们在季节性促销中提高了 30% 的销售额，同时保持了健康的利润率。",
      author: "张经理",
      company: "时尚优品服饰",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote: "这个平台的库存管理功能帮助我们减少了 40% 的库存积压，大大提高了资金周转效率。",
      author: "李总监",
      company: "潮流服装集团",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote: "销售预测功能非常准确，让我们能够提前规划生产和营销活动，抢占市场先机。",
      author: "王副总",
      company: "品质服装有限公司",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className=" relative px-4 py-20 md:py-32 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <Badge className="px-3 py-1 text-sm" variant="outline">
                AI 驱动的销售预测
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                重新定义
                <br />
                服装行业定价策略
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                基于 Prophet 时间序列预测模型，为服装企业提供精准的销售预测和智能定价策略，提升销售业绩和库存周转率。
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-full group">
                    开始使用
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-1 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-md -z-10"></div>
                <div className="bg-card rounded-xl overflow-hidden border">
                  <div className="flex border-b">
                    <div className="flex space-x-1 p-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex mb-4 border-b pb-2">
                      <div className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary -mb-[9px]">
                        销售预测与定价分析
                      </div>
                    </div>
                    <div className="h-[300px] relative overflow-hidden">
                      <div className="absolute inset-0">
                        <img
                          src="/销售预测.png?height=300&width=500&text=销售预测与定价分析"
                          alt="销售预测与定价分析"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-primary/30 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-primary/30 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* 波浪分隔符 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="currentColor"
              fillOpacity="0.05"
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* 核心功能模块 */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-background/95">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm" variant="outline">
              功能亮点
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">全方位的智能分析与决策支持</h2>
            <p className="max-w-[800px] text-muted-foreground text-lg">
              我们的平台整合了先进的 AI 算法和数据分析技术，为服装企业提供全面的销售分析和预测功能
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-10 w-10" />,
                title: "多维度数据可视化",
                description: "通过丰富的图表类型和交互式仪表盘，直观展现销售趋势和模式，支持多维度数据筛选和分析。",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: <LineChart className="h-10 w-10" />,
                title: "Prophet 驱动的销售预测",
                description: "采用 Facebook 开发的 Prophet 模型，对历史销售数据进行建模，生成高精度的销售趋势预测。",
                color: "from-purple-500 to-pink-600",
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "实时数据更新与监控",
                description: "通过 SSE 技术，后端实时推送最新的销售数据至前端，确保决策基于最新的市场动态。",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: <PieChart className="h-10 w-10" />,
                title: "智能定价策略优化",
                description: "基于销售预测、价格弹性和竞争对手分析，提供季节性促销定价建议，帮助企业制定最优价格策略。",
                color: "from-emerald-500 to-green-600",
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "季节性模式分析",
                description: "识别销售数据中的季节性模式，分析不同季节的销售特点，为季节性促销活动提供数据支持。",
                color: "from-rose-500 to-red-600",
              },
              {
                icon: <Settings className="h-10 w-10" />,
                title: "库存管理智能优化",
                description: "结合销售预测结果，提供库存优化建议，减少库存积压，提高资金周转率和供应链效率。",
                color: "from-cyan-500 to-blue-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 duration-300 bg-card border`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
                <div className="p-6">
                  <div
                    className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-md mb-5`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} 服装促销定价策略平台. 保留所有权利.
              </p>
              <div className="flex gap-4">
                <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                  使用条款
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                  隐私政策
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                  联系我们
                </Link>
              </div>
            </div>
          </footer>
    </>
  )
}

