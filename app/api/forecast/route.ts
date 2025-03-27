import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// 获取销售预测数据
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const forecastDays = parseInt(searchParams.get('days') || '30');
    const confidenceInterval = searchParams.get('confidenceInterval') === 'true';
    
    // 在实际项目中，这里应该调用 Python 预测服务或从缓存获取预测结果
    // 这里为了演示，返回模拟数据
    
    // 获取历史销售数据作为预测的基础
    let salesQuery = collection(db, 'sales');
    let constraints = [];
    
    if (category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    constraints.push(orderBy('date', 'desc'));
    constraints.push(limit(90)); // 获取过去90天的数据
    
    const querySnapshot = await getDocs(query(salesQuery, ...constraints));
    
    const historicalData = [];
    querySnapshot.forEach((doc) => {
      historicalData.push({
        date: doc.data().date,
        value: doc.data().amount
      });
    });
    
    // 调用预测服务
    // 实际项目中，这里应该调用 Python 预测服务
    // const forecastData = await callPredictionService(historicalData, forecastDays);
    
    // 模拟预测数据
    const today = new Date();
    const forecastData = Array.from({ length: forecastDays }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // 基于历史数据的平均值生成简单预测
      const baseValue = historicalData.length > 0 
        ? historicalData.reduce((sum, item) => sum + item.value, 0) / historicalData.length 
        : 1000;
      
      // 添加一些随机波动和上升趋势
      const trend = 1 + (i / forecastDays) * 0.2; // 上升趋势
      const randomFactor = 0.9 + Math.random() * 0.2; // 随机波动
      const value = baseValue * trend * randomFactor;
      
      // 如果需要置信区间
      const yhat_lower = confidenceInterval ? value * 0.85 : undefined;
      const yhat_upper = confidenceInterval ? value * 1.15 : undefined;
      
      return {
        date: date.toISOString().split('T')[0],
        value: Math.round(value),
        ...(confidenceInterval && { yhat_lower, yhat_upper })
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        historical: historicalData,
        forecast: forecastData
      }
    });
  } catch (error) {
    console.error('Error generating forecast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate forecast' },
      { status: 500 }
    );
  }
}

// 更新预测参数
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 这里应该处理预测参数的更新
    // 在实际项目中，这些参数可能会被传递给 Python 预测服务
    
    const { 
      category,
      forecastDays, 
      seasonalityMode, 
      changePointPriorScale,
      seasonalityPriorScale
    } = body;
    
    // 存储预测参数
    await setDoc(doc(db, 'forecastParameters', category || 'default'), {
      forecastDays,
      seasonalityMode,
      changePointPriorScale,
      seasonalityPriorScale,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Forecast parameters updated successfully'
    });
  } catch (error) {
    console.error('Error updating forecast parameters:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update forecast parameters' },
      { status: 500 }
    );
  }
}
