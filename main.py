from collections import deque

antrian = deque()

def tampilkan_antrian():
    if not antrian:
        print("antrian kosong.")
    else:
        print("daftar antrian saat ini: ")
        for i,nama in enumerate(antrian,start=1):
            print(f"{i}. {nama}")
            
def tambah_antrian():
    nama = input("masukkan nama: ")
    antrian.append(nama)
    print(f"antrian {nama} ditambahkan.")
    
def layani_antrian():
    if not antrian:
        print("tidak ada antrian yg perlu dilayani")
    else:
        nama = antrian.popleft()
        print(f"{nama} sedang di layani.")

def menu():
    while True:
        print("\n--- MENU ANTRIAN ---")
        print("1. Tambah Antrian")
        print("2. Layani Antrian")
        print("3. Tampilkan Antrian")
        print("4. Keluar")
        pilihan = input("Pilih menu (1-4): ")

        if pilihan == '1':
            tambah_antrian()
        elif pilihan == '2':
            layani_antrian()
        elif pilihan == '3':
            tampilkan_antrian()
        elif pilihan == '4':
            print("Program selesai.")
            break
        else:
            print("Pilihan tidak valid!")

menu()
