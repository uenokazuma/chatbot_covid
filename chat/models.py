from django.db import models
from django.db.models.base import Model

# Create your models here.


class qa_collection(models.Model):
    id_qa_collection = models.AutoField(primary_key=True)
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=5000)
