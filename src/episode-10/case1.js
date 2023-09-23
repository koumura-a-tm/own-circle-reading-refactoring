if (summer())
  // こちらにあった then節 を
  charge = summerCharge();
else charge = quantity * plan.summerRate + plan.regularServiceCharge;

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// 新しい関数に抽出します。
function summerCharge() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
