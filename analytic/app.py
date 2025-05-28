from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression
import requests

app = Flask(__name__)
CORS(app)

# Fungsi untuk ambil data dari Spring Boot
def fetch_data_siswa():
    try:
        response = requests.get("http://localhost:8080/api/siswa")
        data = response.json()
        return data
    except Exception as e:
        print(f"Gagal ambil data siswa: {e}")
        return None

# Fungsi untuk latih model berdasarkan data real dari DB
def train_model():
    data = fetch_data_siswa()
    if not data:
        return None, None, None

    jumlah_siswa = len(data)
    total_balance = sum(s.get("balance", 0) for s in data)

    # Latih model dengan satu titik data (karena cuma 1 set data riil)
    X = np.array([[jumlah_siswa]])
    y = np.array([total_balance])
    model = LinearRegression().fit(X, y)

    return model, jumlah_siswa, total_balance

# Endpoint untuk prediksi pemasukan berdasarkan jumlah siswa input
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data or "jumlah" not in data:
            return jsonify({"error": "Data 'jumlah' harus disertakan"}), 400

        jumlah = data["jumlah"]
        try:
            jumlah = float(jumlah)
        except (ValueError, TypeError):
            return jsonify({"error": "Jumlah harus berupa angka"}), 400

        if jumlah <= 0:
            return jsonify({"error": "Jumlah siswa harus lebih dari 0"}), 400

        model, _, _ = train_model()
        if not model:
            return jsonify({"error": "Gagal melatih model"}), 500

        prediksi = model.predict([[jumlah]])[0]
        return jsonify({
            "prediksi_pemasukan": round(prediksi, 2),
            "input_jumlah": jumlah,
            "status": "success"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint untuk melihat total pemasukan real dari siswa
@app.route("/api/total", methods=["GET"])
def get_total_pemasukan():
    try:
        data = fetch_data_siswa()
        if not data:
            return jsonify({"error": "Gagal mengambil data siswa"}), 500

        total_balance = sum(s.get("balance", 0) for s in data)
        jumlah_siswa = len(data)

        return jsonify({
            "jumlah_siswa": jumlah_siswa,
            "total_balance": total_balance,
            "status": "real_data"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
