from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

# Data training
jumlah_siswa = np.array([20, 30, 40, 50]).reshape(-1, 1)
pemasukan = np.array([50000000, 75000000, 100000000, 125000000])
model = LinearRegression().fit(jumlah_siswa, pemasukan)

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        
        # Validasi data
        if not data or 'jumlah' not in data:
            return jsonify({"error": "Data jumlah harus disertakan"}), 400
            
        jumlah = data['jumlah']
        
        # Validasi tipe data
        try:
            jumlah = float(jumlah)
        except (ValueError, TypeError):
            return jsonify({"error": "Jumlah harus berupa angka"}), 400
            
        # Validasi nilai positif
        if jumlah <= 0:
            return jsonify({"error": "Jumlah siswa harus lebih dari 0"}), 400
            
        # Prediksi
        prediksi = model.predict([[jumlah]])[0]
        return jsonify({
            "prediksi_pemasukan": round(prediksi, 2),
            "status": "success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
