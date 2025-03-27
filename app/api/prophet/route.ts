import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// Prophet 预测服务的 URL
const PROPHET_API_URL = process.env.PROPHET_API_URL || 'http://localhost:8000';

// 获取销售预测
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      category, 
      periods = 30, 
      seasonalityMode = 'multiplicative',
      changePointPriorScale = 0.05,
      seasonalityPriorScale = 10.0,
      includeHistory = false
    } = body;
    
    // 从 Firestore 获取历史销售数据
    let salesQuery = collection(db, 'sales');
    let constraints = [];
    
    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    constraints.push(orderBy('date', 'desc'));
    constraints.push(limit(730)); // 获取最近两年的数据
    
    const querySnapshot = await getDocs(query(salesQuery, ...constraints));
    
    const salesData = [];
    querySnapshot.forEach((doc) => {
      salesData.push({
        date: doc.data().date,
        value: doc.data().amount
      });
    });
    
    // 确保数据按日期升序排序
    salesData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // 调用 Prophet API 生成预测
    const response = await fetch(`${PROPHET_API_URL}/forecast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: salesData,
        periods,
        seasonality_mode: seasonalityMode,
        changepoint_prior_scale: changePointPriorScale,
        seasonality_prior_scale: seasonalityPriorScale,
        include_history: includeHistory
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Prophet API error: ${errorData.detail || response.statusText}`);
    }
    
    const forecastData = await response.json();
    
    // 将预测结果存储到 Firestore (可选)
    // 这样可以在前端快速获取之前的预测结果而不需要重新计算
    /*
    await setDoc(doc(db, 'forecasts', category || 'all'), {
      forecast: forecastData.forecast,
      parameters: {
        periods,
        seasonalityMode,
        changePointPriorScale,
        seasonalityPriorScale
      },
      createdAt: new Date().toISOString()
    });
    */

    return NextResponse.json({ 
      success: true, 
      data: forecastData
    });
  } catch (error) {
    console.error('Error generating forecast with Prophet:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate forecast' },
      { status: 500 }
    );
  }
}

// 评估预测模型
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      category, 
      initial = 180, 
      period = 30, 
      horizon = 30 
    } = body;
    
    // 从 Firestore 获取历史销售数据
    let salesQuery = collection(db, 'sales');
    let constraints = [];
    
    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    constraints.push(orderBy('date', 'desc'));
    constraints.push(limit(730)); // 获取最近两年的数据
    
    const querySnapshot = await getDocs(query(salesQuery, ...constraints));
    
    const salesData = [];
    querySnapshot.forEach((doc) => {
      salesData.push({
        date: doc.data().date,
        value: doc.data().amount
      });
    });
    
    // 确保数据按日期升序排序
    salesData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // 调用 Prophet API 评估模型
    const response = await fetch(`${PROPHET_API_URL}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: salesData,
        initial,
        period,
        horizon
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Prophet API error: ${errorData.detail || response.statusText}`);
    }
    
    const evaluationData = await response.json();

    return NextResponse.json({ 
      success: true, 
      data: evaluationData
    });
  } catch (error) {
    console.error('Error evaluating Prophet model:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to evaluate model' },
      { status: 500 }
    );
  }
}
