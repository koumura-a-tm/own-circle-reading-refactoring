// 障害手当てを計算する

// まとめた条件に対して、関数の抽出 を行う
function disabilityAmount() {
  if (isNotEligibleForDisability) return 0;
}

// is Not Eligible For Disability = 障害者に対する資格がない
function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}

// and演算子 && を使う
// 入れ子のif文を使っている場合
if (anEmployee.onVacation && anEmployee.seniority > 10) return 1;
return 0.5;
