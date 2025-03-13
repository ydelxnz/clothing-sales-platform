import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "服装促销定价策略平台",
  description: "基于Prophet模型的服装行业季节性促销定价策略平台",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className=" flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <Link href="/" className="text-xl font-bold">
                  服装促销定价策略平台
                </Link>
              </div>
              <nav className="hidden md:flex gap-6">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  首页
                </Link>
                <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                  数据看板
                </Link>
                <Link href="/forecast" className="text-sm font-medium transition-colors hover:text-primary">
                  销售预测
                </Link>
                <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
                  定价策略
                </Link>
                <Link href="/inventory" className="text-sm font-medium transition-colors hover:text-primary">
                  库存管理
                </Link>
                <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
                  系统设置
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  登录
                </Button>
                <Sheet>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">打开菜单</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="md:hidden">
                    <div className="flex flex-col gap-6 py-6">
                      <Link href="/" className="text-base font-medium transition-colors hover:text-primary">
                        首页
                      </Link>
                      <Link href="/dashboard" className="text-base font-medium transition-colors hover:text-primary">
                        数据看板
                      </Link>
                      <Link href="/forecast" className="text-base font-medium transition-colors hover:text-primary">
                        销售预测
                      </Link>
                      <Link href="/pricing" className="text-base font-medium transition-colors hover:text-primary">
                        定价策略
                      </Link>
                      <Link href="/inventory" className="text-base font-medium transition-colors hover:text-primary">
                        库存管理
                      </Link>
                      <Link href="/settings" className="text-base font-medium transition-colors hover:text-primary">
                        系统设置
                      </Link>
                      <Button className="mt-4">登录</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'