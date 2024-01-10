from django.db import models

class ExpanceTrackerModela(models.Model):
    name  = models.CharField(max_length=30)
    date = models.DateField()
    description = models.CharField(max_length=100)
    Amount = models.IntegerField() 

    def __str__(self):
        return self.name
