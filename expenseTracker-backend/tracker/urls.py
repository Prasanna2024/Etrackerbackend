from django.urls import path
from .views import *
urlpatterns =[
    path('api/',Tracker.as_view()),
    path('api/<int:pk>',Tracker.as_view(),name='update')
]