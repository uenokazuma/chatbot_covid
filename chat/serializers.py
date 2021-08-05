from django.db.models import fields
from rest_framework import serializers
from chat.models import qa_collection


class qa_collectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = qa_collection
        fields = ('id_qa_collection', 'question', 'answer')
