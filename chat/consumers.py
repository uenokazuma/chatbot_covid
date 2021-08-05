import json
from channels.generic.websocket import WebsocketConsumer
from Levenshtein import ratio

from chat.models import qa_collection

class chatConsumer(WebsocketConsumer):
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message =  text_data_json['message']

        data_score = []
        if message != 'welcome' :
            qa_collection_data = qa_collection.objects.all()

            for row in qa_collection_data :
                score = ratio(row.question, message)

                data_score.append(qa_score(row.question, row.answer, score))
            
            data_score.sort(key=lambda qa_score: qa_score.score, reverse=True)
            message = json.dumps(data_score[0].__dict__)


        self.send(text_data=json.dumps({
            'message' : message
        }))

class qa_score:
    def __init__(self, question, answer, score) :
        self.question = question
        self.answer = answer
        self.score = score

    def __repr__(self):
        return repr((self.question, self.answer, self.score))