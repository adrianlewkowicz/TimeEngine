FROM python:3.10-slim
WORKDIR /app

COPY TimeEngine.ML/Python/requirements.txt ./
RUN pip install -r requirements.txt

COPY TimeEngine.ML/Python/ ./

CMD ["python", "model_service.py"]
