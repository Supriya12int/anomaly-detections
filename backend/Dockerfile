FROM pytorch/pytorch:2.0.1-cpu

WORKDIR /app

COPY requirements.txt .

# remove torch and torchvision so they are not reinstalled
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
