from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini import enhance_event_description

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Backend is running successfully 🚀"


@app.route("/ai/enhance-event", methods=["POST"])
def enhance_event():
    data = request.get_json()
    print("INCOMING DATA:", data)

    try:
        enhanced = enhance_event_description(data)
        return jsonify({"enhancedDescription": enhanced})
    except Exception as e:
        print("GEMINI ERROR:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
