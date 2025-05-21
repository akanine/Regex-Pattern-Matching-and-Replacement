from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import pandas as pd

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response(status=400)  # No file provided

        try:
            # Read CSV or Excel file into DataFrame
            if file_obj.name.endswith('.csv'):
                df = pd.read_csv(file_obj)
            elif file_obj.name.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file_obj)
            else:
                return Response(status=400)  # Unsupported format

            data = df.to_dict(orient='records')
            return Response({"data": data}, status=200)

        except Exception:
            return Response(status=500)  # Generic server error