from django.urls import path
from .views import FileUploadView, RegexReplaceView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('process/', RegexReplaceView.as_view(), name='regex-process'),
]

