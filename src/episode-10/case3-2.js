// 従業員への支払額を計算するコード
// ロジックのテキストは、Lorem ipsum（ロレム。イプサム）と呼ばれるダミーテキスト

// 従業員が会社に在籍している場合のみ支払う
// isSeparated（離職者）とisRetired（退職者）を除外する必要がある

// 主目的である 計算 は、2つの条件が当てはまらない従業員 に対してのみ適用されます。
// このような場合、ガード節を 使用するとコードの意図 を明快に表現できる。
function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) {
    result = { amount: 0, reasonCode: "RET" };
  } else {
    // 金額を計算するロジック
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    setImmediate.do.eiusmod =
      tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(ninim.veniam);
    result = someFinalComputation;
  }
  return result;
}
