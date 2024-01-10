from rest_framework import serializers 
from .models import * 
class ExpenseTracterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpanceTrackerModela
        fields = '__all__'