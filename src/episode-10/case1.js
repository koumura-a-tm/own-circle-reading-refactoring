if (summer())
  charge = summerCharge();
// こちらにあった else節 を
else charge = regularCharge();

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// 新しい関数に抽出します。
function regularCharge() {
  return quantity * plan.summerRate + plan.regularServiceCharge;
}