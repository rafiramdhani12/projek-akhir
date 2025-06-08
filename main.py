from collections import deque

antrian = deque()

def tampilkan_antrian():
    if not antrian:
        print("\n antrian kosong.")
    else:
        print("\n daftar antrian saat ini: ")
        for i,(nama , pesanan) in enumerate(antrian,start=1):
            print(f"{i}. {nama} , pesanan {pesanan}\n")
            
def tambah_antrian():
    nama = input("masukkan nama: ")
    pesananan = input("masukkan pesanan: ")
    antrian.append((nama, pesananan)) # simpan sebagai tuple
    print(f"\n antrian {nama} , pesananan {pesananan} ditambahkan.")
    
def layani_antrian():
    if not antrian:
        print("\n tidak ada antrian yg perlu dilayani")
    else:
        nama,pesanan = antrian.popleft()
        print(f"\n {nama} sedang di layani. (pesananan: {pesanan})")
        
def customer():
    print("selamat datang di resto pak budi")
    tambah_antrian()

def menu():
    try:
        for i in range(2):
            customer()

        while True:
            print("\n")
            print("1. Layani Antrian")
            print("2. Tampilkan Antrian")
            print("3. Keluar")
            pilihan = input("Pilih menu (1-3): ")

            if pilihan == '1':
                    layani_antrian()
            elif pilihan == '2':
                    tampilkan_antrian()
            elif pilihan == '3':
                    print("Program selesai.")
                    break
            else:
                    print("Pilihan tidak valid!")
    except KeyboardInterrupt:
        print("\nmesin telah dimatikan")
menu()
