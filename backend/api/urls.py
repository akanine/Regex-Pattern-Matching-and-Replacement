from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.FileUploadView.as_view(), name='file-upload'),
    # path('process/', views.RegexReplaceView.as_view(), name='regex-process'),
]
