from collections import deque
class Kasir:
    def __init__(self):
        self.antrian = deque()
        
    def tampilkan_antrian(self):
        if not self.antrian:
            print("\n antrian kosong.")
        else:
            print("\n daftar antrian saat ini: ")
            for i,(nama , pesanan) in enumerate(self.antrian,start=1):
                print(f"{i}. {nama} , pesanan {pesanan}\n")
    
    def tambah_antrian(self):
        nama = input("masukkan nama: ")
        pesananan = input("masukkan pesanan: ")
        self.antrian.append((nama, pesananan)) # simpan sebagai tuple
        print(f"\n antrian {nama} , pesananan {pesananan} ditambahkan.")
    
    def layani_antrian(self):
        if not self.antrian:
            print("\n tidak ada antrian yg perlu dilayani")
        else:
            nama,pesanan = self.antrian.popleft()
            print(f"\n {nama} sedang di layani. (pesananan: {pesanan})")
            
    def customer(self):
        print("selamat datang di resto pak memek")
        self.tambah_antrian()
        
    def menu(self):
        try:
            for i in range(2):
                self.customer()

            while True:
                print("\n")
                print("1. Layani Antrian")
                print("2. Tampilkan Antrian")
                print("3. Keluar")
                pilihan = input("Pilih menu (1-3): ")

                if pilihan == '1':
                        self.layani_antrian()
                elif pilihan == '2':
                        self.tampilkan_antrian()
                elif pilihan == '3':
                        print("Program selesai.")
                        break
                else:
                        print("Pilihan tidak valid!")
        except KeyboardInterrupt:
            print("\nmesin telah dimatikan")

if __name__ == "__main__":
    kasir = Kasir()
    kasir.menu()
