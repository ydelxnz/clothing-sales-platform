import { db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit, 
  DocumentData, 
  QuerySnapshot 
} from 'firebase/firestore';

type SubscriptionCallback = (data: DocumentData[]) => void;
type ErrorCallback = (error: Error) => void;

// 存储所有活跃的订阅
const activeSubscriptions: { [key: string]: () => void } = {};

/**
 * 订阅销售数据实时更新
 * @param category 产品类别
 * @param limitCount 限制返回的数据条数
 * @param callback 数据更新回调函数
 * @param errorCallback 错误回调函数
 * @returns 取消订阅的函数
 */
export const subscribeSalesData = (
  category: string = 'all',
  limitCount: number = 50,
  callback: SubscriptionCallback,
  errorCallback?: ErrorCallback
) => {
  // 生成唯一的订阅ID
  const subscriptionId = `sales_${category}_${limitCount}_${Date.now()}`;
  
  // 构建查询
  let salesQuery = collection(db, 'sales');
  let constraints = [];
  
  if (category !== 'all') {
    constraints.push(where('category', '==', category));
  }
  
  constraints.push(orderBy('date', 'desc'));
  constraints.push(limit(limitCount));
  
  // 创建实时订阅
  const unsubscribe = onSnapshot(
    query(salesQuery, ...constraints),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const salesData: DocumentData[] = [];
      snapshot.forEach((doc) => {
        salesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(salesData);
    },
    (error) => {
      console.error('Error subscribing to sales data:', error);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
  
  // 存储取消订阅函数
  activeSubscriptions[subscriptionId] = unsubscribe;
  
  // 返回取消订阅函数和订阅ID
  return {
    unsubscribe: () => {
      unsubscribe();
      delete activeSubscriptions[subscriptionId];
    },
    subscriptionId
  };
};

/**
 * 订阅库存数据实时更新
 * @param category 产品类别
 * @param limitCount 限制返回的数据条数
 * @param callback 数据更新回调函数
 * @param errorCallback 错误回调函数
 * @returns 取消订阅的函数
 */
export const subscribeInventoryData = (
  category: string = 'all',
  limitCount: number = 50,
  callback: SubscriptionCallback,
  errorCallback?: ErrorCallback
) => {
  // 生成唯一的订阅ID
  const subscriptionId = `inventory_${category}_${limitCount}_${Date.now()}`;
  
  // 构建查询
  let inventoryQuery = collection(db, 'inventory');
  let constraints = [];
  
  if (category !== 'all') {
    constraints.push(where('category', '==', category));
  }
  
  constraints.push(orderBy('updatedAt', 'desc'));
  constraints.push(limit(limitCount));
  
  // 创建实时订阅
  const unsubscribe = onSnapshot(
    query(inventoryQuery, ...constraints),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const inventoryData: DocumentData[] = [];
      snapshot.forEach((doc) => {
        inventoryData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(inventoryData);
    },
    (error) => {
      console.error('Error subscribing to inventory data:', error);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
  
  // 存储取消订阅函数
  activeSubscriptions[subscriptionId] = unsubscribe;
  
  // 返回取消订阅函数和订阅ID
  return {
    unsubscribe: () => {
      unsubscribe();
      delete activeSubscriptions[subscriptionId];
    },
    subscriptionId
  };
};

/**
 * 订阅产品价格实时更新
 * @param category 产品类别
 * @param limitCount 限制返回的数据条数
 * @param callback 数据更新回调函数
 * @param errorCallback 错误回调函数
 * @returns 取消订阅的函数
 */
export const subscribeProductPrices = (
  category: string = 'all',
  limitCount: number = 50,
  callback: SubscriptionCallback,
  errorCallback?: ErrorCallback
) => {
  // 生成唯一的订阅ID
  const subscriptionId = `products_${category}_${limitCount}_${Date.now()}`;
  
  // 构建查询
  let productsQuery = collection(db, 'products');
  let constraints = [];
  
  if (category !== 'all') {
    constraints.push(where('category', '==', category));
  }
  
  constraints.push(orderBy('updatedAt', 'desc'));
  constraints.push(limit(limitCount));
  
  // 创建实时订阅
  const unsubscribe = onSnapshot(
    query(productsQuery, ...constraints),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const productsData: DocumentData[] = [];
      snapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(productsData);
    },
    (error) => {
      console.error('Error subscribing to product data:', error);
      if (errorCallback) {
        errorCallback(error);
      }
    }
  );
  
  // 存储取消订阅函数
  activeSubscriptions[subscriptionId] = unsubscribe;
  
  // 返回取消订阅函数和订阅ID
  return {
    unsubscribe: () => {
      unsubscribe();
      delete activeSubscriptions[subscriptionId];
    },
    subscriptionId
  };
};

/**
 * 取消所有活跃的订阅
 */
export const unsubscribeAll = () => {
  Object.values(activeSubscriptions).forEach(unsubscribe => unsubscribe());
  Object.keys(activeSubscriptions).forEach(key => delete activeSubscriptions[key]);
};

/**
 * 取消特定ID的订阅
 * @param subscriptionId 订阅ID
 */
export const unsubscribeById = (subscriptionId: string) => {
  if (activeSubscriptions[subscriptionId]) {
    activeSubscriptions[subscriptionId]();
    delete activeSubscriptions[subscriptionId];
    return true;
  }
  return false;
};
