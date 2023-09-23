// 鳥の種類に基づいてその個体の状態を評価し、文字列として返す switch文
switch (bird.type) {
  case "EuropeanSwallow":
    return "avarage";
  case "AfircanSwallow":
    return bird.numberOfCoconuts > 2 ? "tired" : "avarage";
  case "NorwegianBlueParrot":
    return bird.voltage > 100 ? "scorched" : "beautiful";
  default:
    return "unknown";
}
