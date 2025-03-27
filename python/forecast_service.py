import pandas as pd
import numpy as np
from prophet import Prophet
from prophet.diagnostics import cross_validation, performance_metrics
import json
import os
from datetime import datetime, timedelta

class SalesForecastService:
    def __init__(self):
        self.model = None
        self.data = None
        self.forecast = None
        self.metrics = None
    
    def load_data(self, data_path=None, data_json=None):
        """
        加载销售数据，可以从文件或JSON字符串加载
        """
        if data_json:
            # 从JSON字符串加载数据
            data = json.loads(data_json)
            df = pd.DataFrame(data)
        elif data_path and os.path.exists(data_path):
            # 从CSV文件加载数据
            df = pd.read_csv(data_path)
        else:
            raise ValueError("需要提供有效的数据路径或JSON数据")
        
        # 确保数据格式正确
        if 'date' not in df.columns or 'value' not in df.columns:
            raise ValueError("数据必须包含'date'和'value'列")
        
        # 准备Prophet所需的数据格式
        df = df.rename(columns={'date': 'ds', 'value': 'y'})
        df['ds'] = pd.to_datetime(df['ds'])
        
        self.data = df
        return df
    
    def train_model(self, seasonality_mode='multiplicative', 
                   changepoint_prior_scale=0.05,
                   seasonality_prior_scale=10.0):
        """
        训练Prophet模型
        
        参数:
        - seasonality_mode: 季节性模式，'multiplicative'或'additive'
        - changepoint_prior_scale: 变化点先验尺度，控制趋势灵活性
        - seasonality_prior_scale: 季节性先验尺度，控制季节性强度
        """
        if self.data is None:
            raise ValueError("请先加载数据")
        
        # 创建并训练模型
        model = Prophet(
            seasonality_mode=seasonality_mode,
            changepoint_prior_scale=changepoint_prior_scale,
            seasonality_prior_scale=seasonality_prior_scale
        )
        
        # 添加中国特殊节假日
        self._add_chinese_holidays(model)
        
        # 拟合模型
        model.fit(self.data)
        self.model = model
        
        return model
    
    def _add_chinese_holidays(self, model):
        """
        添加中国特殊节假日到模型中
        """
        # 这里可以添加春节、国庆节等中国特殊节假日
        # 简化示例，实际应用中应该使用更完整的节假日数据
        chinese_holidays = pd.DataFrame({
            'holiday': 'spring_festival',
            'ds': pd.to_datetime(['2023-01-22', '2024-02-10', '2025-01-29']),
            'lower_window': -3,
            'upper_window': 3,
        })
        
        national_day = pd.DataFrame({
            'holiday': 'national_day',
            'ds': pd.to_datetime(['2023-10-01', '2024-10-01', '2025-10-01']),
            'lower_window': -1,
            'upper_window': 6,
        })
        
        chinese_holidays = pd.concat([chinese_holidays, national_day])
        model.add_country_holidays(country_name='CN')
        model.add_holidays(chinese_holidays)
    
    def make_forecast(self, periods=30, include_history=True):
        """
        生成预测
        
        参数:
        - periods: 预测天数
        - include_history: 是否包含历史数据
        """
        if self.model is None:
            raise ValueError("请先训练模型")
        
        # 创建未来日期数据框
        future = self.model.make_future_dataframe(periods=periods)
        
        # 生成预测
        forecast = self.model.predict(future)
        self.forecast = forecast
        
        # 准备返回结果
        if include_history:
            result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        else:
            # 只返回预测部分
            result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
        
        # 转换为更易读的格式
        result['ds'] = result['ds'].dt.strftime('%Y-%m-%d')
        result = result.rename(columns={
            'ds': 'date',
            'yhat': 'value',
            'yhat_lower': 'lower_bound',
            'yhat_upper': 'upper_bound'
        })
        
        return result.to_dict(orient='records')
    
    def evaluate_model(self, initial=180, period=30, horizon=30):
        """
        评估模型性能
        
        参数:
        - initial: 初始训练期，单位为天
        - period: 每次预测的间隔，单位为天
        - horizon: 预测范围，单位为天
        """
        if self.model is None:
            raise ValueError("请先训练模型")
        
        # 执行交叉验证
        df_cv = cross_validation(
            self.model,
            initial=f'{initial} days',
            period=f'{period} days',
            horizon=f'{horizon} days'
        )
        
        # 计算性能指标
        df_p = performance_metrics(df_cv)
        self.metrics = df_p
        
        # 返回主要指标
        metrics = {
            'mse': df_p['mse'].mean(),
            'rmse': df_p['rmse'].mean(),
            'mae': df_p['mae'].mean(),
            'mape': df_p['mape'].mean(),
            'coverage': df_p['coverage'].mean()
        }
        
        return metrics
    
    def get_seasonality_components(self):
        """
        获取季节性分解组件
        """
        if self.forecast is None:
            raise ValueError("请先生成预测")
        
        # 获取季节性组件
        components = {
            'yearly': self.model.seasonalities.get('yearly'),
            'weekly': self.model.seasonalities.get('weekly'),
            'daily': self.model.seasonalities.get('daily')
        }
        
        # 提取季节性趋势
        seasonal_components = {}
        
        for name, component in components.items():
            if component is not None:
                # 获取季节性组件的数据
                t = np.linspace(0, 1, 100)
                seasonal_components[name] = {
                    'x': t.tolist(),
                    'y': self.model.predict_seasonal_components(t, component).tolist()
                }
        
        return seasonal_components
    
    def to_json(self, forecast_result=None):
        """
        将预测结果转换为JSON格式
        """
        if forecast_result is None and self.forecast is None:
            raise ValueError("没有可用的预测结果")
        
        result = forecast_result or self.make_forecast()
        return json.dumps(result)

# 示例用法
if __name__ == "__main__":
    # 创建示例数据
    dates = pd.date_range(start='2022-01-01', end='2023-12-31')
    values = np.random.normal(loc=1000, scale=200, size=len(dates))
    
    # 添加趋势和季节性
    trend = np.linspace(0, 500, len(dates))
    yearly_seasonality = 300 * np.sin(2 * np.pi * np.arange(len(dates)) / 365)
    weekly_seasonality = 100 * np.sin(2 * np.pi * np.arange(len(dates)) / 7)
    
    values = values + trend + yearly_seasonality + weekly_seasonality
    values = np.maximum(values, 0)  # 确保销售额非负
    
    # 创建数据框
    df = pd.DataFrame({
        'date': dates.strftime('%Y-%m-%d'),
        'value': values.astype(int)
    })
    
    # 保存示例数据
    df.to_csv('sample_sales_data.csv', index=False)
    
    # 使用服务
    service = SalesForecastService()
    service.load_data(data_path='sample_sales_data.csv')
    service.train_model()
    forecast = service.make_forecast(periods=90)
    metrics = service.evaluate_model()
    
    print(f"预测结果示例 (前5条):\n{forecast[:5]}")
    print(f"\n模型评估指标:\n{metrics}")
