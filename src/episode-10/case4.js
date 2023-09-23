// ポリモーフィズムによる条件記述の置き換え
class EuropeanSwallow {
  get plumage() {
    return "avarage";
  }
}

class AfircanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "tired" : "avarage";
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? "scorched" : "beautiful";
  }
}
