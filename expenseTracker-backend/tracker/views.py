from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status 
from rest_framework.response import Response
from .models import *
from .serializers import *

class Tracker(APIView):
    def get(self, request):
        if request.query_params:
            query_key = list(self.request.query_params.keys())[0]
            query_value = self.request.query_params.get(query_key)
            queryset = ExpanceTrackerModela.objects.filter(**{query_key: query_value})
            serializer = ExpenseTracterSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            query_set = ExpanceTrackerModela.objects.all()
            serializer = ExpenseTracterSerializer(query_set,many = True)
            return Response(serializer.data,status = status.HTTP_200_OK)

    
    def post(self, request):
        data = request.data
        serializer = ExpenseTracterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        instance = ExpanceTrackerModela.objects.get(id=pk)
        if instance is not None:
            serializer = ExpenseTracterSerializer(instance,request.data)
            if serializer.is_valid():
                serializer.save()
            else:
                return  Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            query_set = ExpanceTrackerModela.objects.all()
            serializer = ExpenseTracterSerializer(query_set,many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"status":"failed"})
    
    def patch(self,request,pk):
        instance = ExpanceTrackerModela.objects.get(id=pk)
        if instance is not None:
            serializer = ExpenseTracterSerializer(instance,data= request.data,partial= True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"status":"failed"})      

    def delete(self,request,pk):
        instance = ExpanceTrackerModela.objects.get(id =pk)
        if instance:
            instance.delete()
            data = ExpanceTrackerModela.objects.all()
            serializer = ExpenseTracterSerializer(data=data,many = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
        
        return Response({"status":"failed"})      

            