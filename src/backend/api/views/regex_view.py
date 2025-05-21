from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from api.services.openai_client import client

class RegexReplaceView(APIView):
    def post(self, request):
        try:
            # Extract request data
            instruction = request.data.get('instruction')
            replacement = request.data.get('replacement')
            data = request.data.get('data')

            if not instruction or not replacement or not data:
                return Response(status=400)  # Missing inputs

            df = pd.DataFrame(data)

            # Construct natural language prompt
            prompt = (
                f"Generate a regex pattern to match data that satisfies the following instruction: "
                f"'{instruction}'. Only return the regex pattern. Do NOT include explanation or quotes."
            )

            # Call OpenAI to generate regex
            response = client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": "You are a regex generator."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0
            )

            regex = response.choices[0].message.content.strip().strip("`").strip()

            # Apply regex replacement across the entire DataFrame
            df = df.astype(str)
            df = df.replace(to_replace=regex, value=replacement, regex=True)

            return Response({
                "data": df.to_dict(orient='records'),
                "regex": regex
            })

        except Exception:
            return Response(status=500)  # Fallback error response