from fastapi import FastAPI
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

# Prosty przykładowy trening (na stałe dane demonstracyjne)
X = np.array([[1, 3], [2, 5], [3, 7]])
y = np.array([4, 6, 9])
model = LinearRegression().fit(X, y)

@app.get("/predict/{experience_level}/{complexity}")
def predict(experience_level: int, complexity: int):
    predicted_time = model.predict([[experience_level, complexity]])
    return {"estimated_time": predicted_time[0]}
