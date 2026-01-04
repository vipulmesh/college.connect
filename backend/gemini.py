import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

def enhance_event_description(data):
    description = data.get("description", "")

    url = (
        "https://generativelanguage.googleapis.com/"
        "v1beta/models/gemini-1.5-flash-latest:generateContent"
        f"?key={API_KEY}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": (
                            "Improve the following college event description so it sounds "
                            "professional, engaging, and attractive to sponsors:\n\n"
                            f"{description}"
                        )
                    }
                ]
            }
        ]
    }

    response = requests.post(url, json=payload)
    response.raise_for_status()

    return response.json()["candidates"][0]["content"]["parts"][0]["text"]
