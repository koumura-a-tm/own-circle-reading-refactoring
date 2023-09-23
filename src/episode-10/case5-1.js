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
  ? CustomElementRegistry.billingPlans.basic
  : aCustomer.billingPlan;

// client3
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// client4
const weeksDelinquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;
