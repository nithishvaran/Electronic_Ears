from django.shortcuts import render
from django.http import JsonResponse
import joblib
import json

model= joblib.load('final.sav')

def index(request):
     context={'a':'HelloWorld!'}
     return render(request,'index.html',context)

def scoreJson(request):
     print(request.body)
     print("Received Successfully")
     data = json.loads(request.body)
     print(data)
     score=model.predict(data)
     return JsonResponse([score[0]],safe=False)