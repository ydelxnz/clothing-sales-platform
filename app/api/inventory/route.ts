import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, doc, updateDoc } from 'firebase/firestore';

// 获取库存数据
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const warehouse = searchParams.get('warehouse') || 'all';
    
    let inventoryQuery = collection(db, 'inventory');
    let constraints = [];
    
    if (category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    if (warehouse !== 'all') {
      constraints.push(where('warehouse', '==', warehouse));
    }
    
    constraints.push(orderBy('updatedAt', 'desc'));
    
    const querySnapshot = await getDocs(query(inventoryQuery, ...constraints));
    
    const inventoryData = [];
    querySnapshot.forEach((doc) => {
      inventoryData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // 计算库存统计数据
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
    const lowStockItems = inventoryData.filter(item => item.quantity < item.minStockLevel).length;
    
    // 计算库存周转率 (这里使用模拟数据，实际应基于销售数据计算)
    const turnoverRate = 4.2;

    return NextResponse.json({ 
      success: true, 
      data: {
        items: inventoryData,
        stats: {
          totalValue,
          totalItems,
          lowStockItems,
          turnoverRate
        }
      }
    });
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}

// 更新库存数据
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 这里应该添加数据验证逻辑
    
    const { id, quantity, minStockLevel, maxStockLevel } = body;
    
    // 更新库存数据
    await updateDoc(doc(db, 'inventory', id), {
      quantity,
      minStockLevel,
      maxStockLevel,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Inventory updated successfully'
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}

// 获取库存优化建议
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, warehouse } = body;
    
    // 获取库存数据
    let inventoryQuery = collection(db, 'inventory');
    let constraints = [];
    
    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    if (warehouse && warehouse !== 'all') {
      constraints.push(where('warehouse', '==', warehouse));
    }
    
    const querySnapshot = await getDocs(query(inventoryQuery, ...constraints));
    
    const inventoryData = [];
    querySnapshot.forEach((doc) => {
      inventoryData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // 获取销售预测数据
    // 在实际项目中，这里应该调用预测服务或从缓存获取预测结果
    
    // 生成库存优化建议
    const recommendations = inventoryData.map(item => {
      // 这里应该基于销售预测和库存水平生成建议
      // 这里使用简化逻辑
      let action = 'maintain';
      let reason = '';
      
      if (item.quantity < item.minStockLevel) {
        action = 'restock';
        reason = '库存低于最小库存水平';
      } else if (item.quantity > item.maxStockLevel) {
        action = 'reduce';
        reason = '库存超过最大库存水平';
      } else if (item.turnoverRate < 2) {
        action = 'promote';
        reason = '库存周转率低';
      }
      
      return {
        id: item.id,
        product: item.product,
        category: item.category,
        currentStock: item.quantity,
        recommendedAction: action,
        reason: reason,
        suggestedQuantity: action === 'restock' 
          ? Math.ceil((item.minStockLevel + item.maxStockLevel) / 2) 
          : item.quantity
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: recommendations
    });
  } catch (error) {
    console.error('Error generating inventory recommendations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate inventory recommendations' },
      { status: 500 }
    );
  }
}
