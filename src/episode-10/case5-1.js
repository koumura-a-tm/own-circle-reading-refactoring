// ある公共事業会社が、多くのSite（場所）にサービスを提供しています。
class Site {
  get customer() {
    return this._customer;
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
  get isUnknown() {
    return true;
  }
}

// client1
const aCustomer = site.customer;
// ... 大量のコードが入る ...
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

// client2
const plan =
  aCustomer === "unknown"
    ? CustomElementRegistry.billingPlans.basic
    : aCustomer.billingPlan;

// client3
if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

// client4
const weeksDelinquent =
  aCustomer === "unknown"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;
