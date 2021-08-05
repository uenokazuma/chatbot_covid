from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import HttpResponse, JsonResponse
from Levenshtein import ratio

from chat.models import qa_collection
from chat.serializers import qa_collectionSerializer

# Create your views here.


@csrf_exempt
def home(request):
    return render(request, 'chatbox.html')

@csrf_exempt
def answer(request):
    if request.method == 'POST':

        question = JSONParser().parse(request)

        data_score = []
        if message != 'welcome' :
            qa_collection_data = qa_collection.objects.all()

            for row in qa_collection_data :
                score = ratio(row.question, message)

                data_score.append(qa_score(row.question, row.answer, score))
            
            data_score.sort(key=lambda qa_score: qa_score.score, reverse=True)
            message = json.dumps(data_score[0].__dict__)
        
            
        return JsonResponse(message, safe=False)

class qa_score:
    def __init__(self, question, answer, score) :
        self.question = question
        self.answer = answer
        self.score = score

    def __repr__(self):
        return repr((self.question, self.answer, self.score))