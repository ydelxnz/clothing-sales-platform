import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

// 获取销售数据
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const period = searchParams.get('period') || '30';
    const startDate = searchParams.get('startDate') || '';

    let salesQuery = collection(db, 'sales');
    
    // 构建查询条件
    let constraints = [];
    
    if (category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    if (startDate) {
      constraints.push(where('date', '>=', startDate));
    }
    
    // 添加排序和限制
    constraints.push(orderBy('date', 'desc'));
    constraints.push(limit(parseInt(period)));
    
    const querySnapshot = await getDocs(query(salesQuery, ...constraints));
    
    const salesData = [];
    querySnapshot.forEach((doc) => {
      salesData.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return NextResponse.json({ 
      success: true, 
      data: salesData 
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}

// 添加销售数据
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 这里应该添加数据验证逻辑
    
    const { category, amount, date, product, quantity } = body;
    
    // 将销售数据添加到 Firestore
    const docRef = await addDoc(collection(db, 'sales'), {
      category,
      amount,
      date,
      product,
      quantity,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error adding sales data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add sales data' },
      { status: 500 }
    );
  }
}
