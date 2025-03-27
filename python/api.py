from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
import json
import pandas as pd
from forecast_service import SalesForecastService

app = FastAPI(title="销售预测 API", description="基于 Prophet 模型的销售预测 API")

# 定义请求模型
class ForecastRequest(BaseModel):
    data: List[Dict[str, Any]]
    periods: int = 30
    seasonality_mode: str = "multiplicative"
    changepoint_prior_scale: float = 0.05
    seasonality_prior_scale: float = 10.0
    include_history: bool = False

class EvaluationRequest(BaseModel):
    data: List[Dict[str, Any]]
    initial: int = 180
    period: int = 30
    horizon: int = 30

# 创建预测服务实例
forecast_service = SalesForecastService()

@app.post("/forecast")
async def create_forecast(request: ForecastRequest):
    """
    生成销售预测
    
    参数:
    - data: 历史销售数据，格式为 [{"date": "YYYY-MM-DD", "value": 数值}, ...]
    - periods: 预测天数
    - seasonality_mode: 季节性模式，'multiplicative' 或 'additive'
    - changepoint_prior_scale: 变化点先验尺度
    - seasonality_prior_scale: 季节性先验尺度
    - include_history: 是否包含历史数据
    
    返回:
    - forecast: 预测结果
    - seasonality: 季节性分解
    """
    try:
        # 将请求数据转换为 DataFrame
        df = pd.DataFrame(request.data)
        
        # 加载数据
        forecast_service.load_data(data_json=json.dumps(request.data))
        
        # 训练模型
        forecast_service.train_model(
            seasonality_mode=request.seasonality_mode,
            changepoint_prior_scale=request.changepoint_prior_scale,
            seasonality_prior_scale=request.seasonality_prior_scale
        )
        
        # 生成预测
        forecast = forecast_service.make_forecast(
            periods=request.periods,
            include_history=request.include_history
        )
        
        # 获取季节性分解
        seasonality = forecast_service.get_seasonality_components()
        
        return {
            "success": True,
            "forecast": forecast,
            "seasonality": seasonality
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate")
async def evaluate_model(request: EvaluationRequest):
    """
    评估预测模型性能
    
    参数:
    - data: 历史销售数据，格式为 [{"date": "YYYY-MM-DD", "value": 数值}, ...]
    - initial: 初始训练期，单位为天
    - period: 每次预测的间隔，单位为天
    - horizon: 预测范围，单位为天
    
    返回:
    - metrics: 模型评估指标
    """
    try:
        # 加载数据
        forecast_service.load_data(data_json=json.dumps(request.data))
        
        # 训练模型
        forecast_service.train_model()
        
        # 评估模型
        metrics = forecast_service.evaluate_model(
            initial=request.initial,
            period=request.period,
            horizon=request.horizon
        )
        
        return {
            "success": True,
            "metrics": metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """
    健康检查端点
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    # 运行 FastAPI 服务
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
