from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# 🔥 LOAD MODEL (only once)
model = WhisperModel("base", compute_type="int8")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    try:
        file = request.files["file"]

        filepath = "temp_audio.mp3"
        file.save(filepath)

        segments, _ = model.transcribe(filepath)

        text = ""
        for segment in segments:
            text += segment.text + " "

        os.remove(filepath)

        return jsonify({
            "success": True,
            "text": text.strip()
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "success": False,
            "text": ""
        })

if __name__ == "__main__":
    app.run(port=5000)