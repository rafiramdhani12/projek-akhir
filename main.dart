class Person {
  String? name;
  int? age;
  bool? isMarried;

  void display() {
    print("name: $name");
    print("age: $age");
    print("maried status: $isMarried");
  }
}

void main() {
  Person person = Person();
  person.name = "perrel brown";
  person.age = 30;
  person.isMarried = true;
  person.display();
}
