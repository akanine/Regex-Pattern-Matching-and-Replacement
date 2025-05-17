from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import pandas as pd
import re
import os
from dotenv import load_dotenv

# Choose for OpenAI
USE_LLM = True  

# OpenAI settings
if USE_LLM:
    from openai import OpenAI
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=400)

        try:
            if file_obj.name.endswith('.csv'):
                df = pd.read_csv(file_obj)
            elif file_obj.name.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file_obj)
            else:
                return Response({"error": "Unsupported file format"}, status=400)

            data = df.to_dict(orient='records')
            return Response({"data": data}, status=200)

        except Exception as e:
            return Response({"error": f"File processing error: {str(e)}"}, status=500)


class RegexReplaceView(APIView):
    def post(self, request):
        instruction = request.data.get('instruction')
        replacement = request.data.get('replacement')
        data = request.data.get('data')

        if not instruction or not replacement or not data:
            return Response({"error": "Missing instruction, replacement or data."}, status=400)

        try:
           # if USE_LLM:
                # using openai
                prompt = f"""Convert the following instruction into a regular expression: "{instruction}". 
Return only the regex pattern without explanation or code block."""

                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0
                )

                raw_regex = response.choices[0].message.content.strip()
                regex = raw_regex.strip("`").strip("/")

        except Exception as e:
            return Response({"error": f"LLM error: {str(e)}"}, status=500)

        try:
            processed = []
            for row in data:
                new_row = {}
                for key, value in row.items():
                    if isinstance(value, str):
                        new_row[key] = pattern.sub(replacement, value)
                    else:
                        new_row[key] = value
                processed.append(new_row)

            return Response({"data": processed, "regex": regex}, status=200)

        except Exception as e:
            return Response({"error": f"Regex replace error: {str(e)}"}, status=500)
