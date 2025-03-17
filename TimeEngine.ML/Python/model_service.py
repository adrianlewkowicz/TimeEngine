from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

# Dane treningowe (przykładowe)
X = np.array([[1, 3], [2, 5], [3, 7]])
y = np.array([4, 6, 9])
model = LinearRegression().fit(X, y)

class TaskData(BaseModel):
    description: str

class UserData(BaseModel):
    id: str
    skills: List[str]

class PredictionResponse(BaseModel):
    userId: str

@app.post("/predict")
def predict_best_assignee(task: TaskData, candidates: List[UserData]):
    predictions = []
    for user in candidates:
        score = model.predict([[len(user.skills), len(task.description.split())]])
        predictions.append((user.id, score))

    best_match = max(predictions, key=lambda x: x[1])
    return PredictionResponse(userId=best_match[0])
