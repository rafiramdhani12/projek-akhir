<?php  

$data_mahasiswa = [
    [
        "nama" => "arya",
        "nim" => "123",
        "prodi" => "informatika"
    ],
    [
        "nama" => "davi",
        "nim" => "123",
        "prodi" => "informatika"
    ],
    [
        "nama" => "jeremmy",
        "nim" => "123",
        "prodi" => "informatika"
    ],
    [
        "nama" => "akbar",
        "nim" => "123",
        "prodi" => "informatika"
    ],
    [
        "nama" => "rafi",
        "nim" => "123",
        "prodi" => "informatika"
    ]
];

foreach(  $data_mahasiswa as $i => $value){
    echo $data_mahasiswa[$i]["nama"] . "<br>";
    echo $data_mahasiswa[$i]["prodi"] . "<br>";
   
}

?>
