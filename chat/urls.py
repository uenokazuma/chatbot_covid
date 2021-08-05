from django.conf.urls import url
from chat import views

urlpatterns = [
    url('^$', views.home),
    url(r'api/answer$', views.answer)
]