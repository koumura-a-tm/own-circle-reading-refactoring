// ある公共事業会社が、多くのSite（場所）にサービスを提供しています。
class Site {
  get customer() {
    return this._customer === "unknown"
      ? new UnknownCustomer()
      : this._customer;
  }
}

// Customer（顧客）クラスには様々なプロパティがあります。
class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}

  get isUnknown() {
    return false;
  }
}

class UnknownCustomer {
  get name() {
    return "occupant";
  }
  get billingPlan() {
    return registry.billingPlans.basic;
  }
  set billingPlan(arg) {
    // 何もしない
  }
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
    throw new Error(`不正な値について要調査: <${arg}>`);
  return arg.isUnknown;
}

// client1
const aCustomer = site.customer;
// ... 大量のコードが入る ...
let customerName;
if (isUnknown(aCustomer)) customerName = aCustomer.name;
else customerName = aCustomer.name;

// client2
const plan = isUnknown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// client3
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// client4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

// client reader（読み込み処理）
const plan = aCustomer.billingPlan;

// client writer（更新処理）
aCustomer.billingPlan = newPlan;
