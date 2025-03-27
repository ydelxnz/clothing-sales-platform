import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, doc, setDoc } from 'firebase/firestore';

// 获取定价策略建议
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const basePrice = parseFloat(searchParams.get('basePrice') || '100');
    const discountPercentage = parseFloat(searchParams.get('discount') || '20');
    
    // 在实际项目中，这里应该基于销售预测、价格弹性和竞争对手数据生成定价建议
    // 这里为了演示，返回模拟数据
    
    // 获取产品数据
    let productsQuery = collection(db, 'products');
    let constraints = [];
    
    if (category !== 'all') {
      constraints.push(where('category', '==', category));
    }
    
    constraints.push(orderBy('price', 'desc'));
    
    const querySnapshot = await getDocs(query(productsQuery, ...constraints));
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // 生成定价建议
    const pricingRecommendations = products.map(product => {
      const currentPrice = product.price;
      const discountAmount = currentPrice * (discountPercentage / 100);
      const recommendedPrice = Math.round(currentPrice - discountAmount);
      
      // 模拟销量增长和利润变化
      const salesGrowth = Math.round(discountPercentage * 0.8); // 简化模型：折扣每1%带来0.8%的销量增长
      const profitChange = Math.round(salesGrowth * 0.6); // 简化模型：销量增长每1%带来0.6%的利润增长
      
      return {
        id: product.id,
        product: product.name,
        category: product.category,
        currentPrice,
        recommendedPrice,
        discountPercentage,
        expectedSalesGrowth: `+${salesGrowth}%`,
        expectedProfitChange: `+${profitChange}%`
      };
    });
    
    // 生成价格弹性数据
    const elasticityData = Array.from({ length: 10 }, (_, i) => {
      const discountPercent = i * 10; // 0% 到 90% 的折扣
      const salesGrowth = Math.round(discountPercent * (0.7 + Math.random() * 0.6)); // 简化模型
      
      return {
        discountPercent,
        salesGrowth
      };
    });
    
    // 生成竞争对手价格数据
    const competitors = [
      { name: '竞争对手A', priceRatio: 1.1 },
      { name: '竞争对手B', priceRatio: 0.95 },
      { name: '竞争对手C', priceRatio: 1.05 },
      { name: '竞争对手D', priceRatio: 0.9 }
    ];
    
    const competitorPrices = products.map(product => {
      return {
        product: product.name,
        category: product.category,
        ourPrice: product.price,
        competitors: competitors.map(competitor => ({
          name: competitor.name,
          price: Math.round(product.price * competitor.priceRatio)
        }))
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        recommendations: pricingRecommendations,
        elasticity: elasticityData,
        competitorPrices
      }
    });
  } catch (error) {
    console.error('Error generating pricing recommendations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate pricing recommendations' },
      { status: 500 }
    );
  }
}

// 应用定价策略
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 这里应该添加数据验证逻辑
    
    const { productIds, discountPercentage, startDate, endDate, promotionName } = body;
    
    // 创建促销活动
    const promotionId = Date.now().toString();
    await setDoc(doc(db, 'promotions', promotionId), {
      name: promotionName,
      discountPercentage,
      startDate,
      endDate,
      productIds,
      createdAt: new Date().toISOString()
    });
    
    // 更新产品价格
    for (const productId of productIds) {
      // 获取产品当前价格
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        const product = productDoc.data();
        const originalPrice = product.price;
        const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
        
        // 更新产品价格
        await updateDoc(doc(db, 'products', productId), {
          promotionPrice: discountedPrice,
          promotionId,
          updatedAt: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Pricing strategy applied successfully',
      promotionId
    });
  } catch (error) {
    console.error('Error applying pricing strategy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to apply pricing strategy' },
      { status: 500 }
    );
  }
}

// 模拟定价策略
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 这里应该添加数据验证逻辑
    
    const { 
      basePrice, 
      discountPercentage, 
      promotionPeriod, 
      targetAudience 
    } = body;
    
    // 模拟不同定价策略的效果
    // 在实际项目中，这里应该使用更复杂的模型
    
    const discountedPrice = Math.round(basePrice * (1 - discountPercentage / 100));
    
    // 简化模型：基于折扣、促销周期和目标客群计算销量增长
    let salesGrowthFactor = discountPercentage * 0.8; // 折扣每1%带来0.8%的销量增长
    
    // 调整促销周期的影响
    if (promotionPeriod < 15) {
      salesGrowthFactor *= 1.2; // 短期促销更有效
    } else if (promotionPeriod > 45) {
      salesGrowthFactor *= 0.8; // 长期促销效果降低
    }
    
    // 调整目标客群的影响
    if (targetAudience === 'new') {
      salesGrowthFactor *= 1.3; // 对新客户更有效
    } else if (targetAudience === 'returning') {
      salesGrowthFactor *= 1.1; // 对回头客有一定效果
    } else if (targetAudience === 'vip') {
      salesGrowthFactor *= 0.9; // 对VIP客户折扣效果较小
    }
    
    const expectedSalesGrowth = Math.round(salesGrowthFactor);
    
    // 计算利润变化
    const costPerUnit = basePrice * 0.6; // 假设成本是原价的60%
    const originalProfit = basePrice - costPerUnit;
    const discountedProfit = discountedPrice - costPerUnit;
    const originalProfitTotal = originalProfit * 100; // 假设原始销量为100
    const discountedProfitTotal = discountedProfit * (100 + expectedSalesGrowth);
    const profitChange = Math.round((discountedProfitTotal / originalProfitTotal - 1) * 100);
    
    // 生成模拟结果
    const simulationResult = {
      originalPrice: basePrice,
      discountedPrice,
      discountPercentage,
      promotionPeriod,
      targetAudience,
      expectedSalesGrowth: `+${expectedSalesGrowth}%`,
      expectedProfitChange: `${profitChange > 0 ? '+' : ''}${profitChange}%`,
      revenueBeforePromotion: basePrice * 100,
      revenueAfterPromotion: discountedPrice * (100 + expectedSalesGrowth),
      profitBeforePromotion: originalProfitTotal,
      profitAfterPromotion: discountedProfitTotal
    };

    return NextResponse.json({ 
      success: true, 
      data: simulationResult
    });
  } catch (error) {
    console.error('Error simulating pricing strategy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to simulate pricing strategy' },
      { status: 500 }
    );
  }
}
