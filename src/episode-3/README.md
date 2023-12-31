# コードの不吉な匂い

## リファクタリングのタイミング

- リファクタリングの方法を知るのは当然重要だがそれを「いつ」実行するべきかの判断も同様に重要

### 匂いの比喩

- リファクタリングの適切なタイミングや必要性を感じる「きっかけ」を不吉な匂いという比喩で示唆している。
  - 匂いの概念をコードに適用すると内部の何かしらの問題やリファクタリングの必要性を示唆する兆候を「匂い」として捉えることができる
  - 例） 冗長なコード、不明瞭な変数名、長過ぎる関数名...etc
- 他人のコードをレビューをしている時に感じる違和感（匂い）これが何を示唆しているのか、どのようにして改善していけるかを考えていく必要がある。

### 経験と直感

- リファクタリングのタイミングは、経験で磨かれた直感に基づくことが多い
- 磨かれた人間の直感にはメトリクスをいくら集めても敵わない

日々コーディングを行う中でこの「匂い」を感じ取って改善の方向を探るセンスを磨くことが重要になってくる

## 不可思議な名前

### コードの明確性

- コードは他の開発者、未来の自分に対して明確である必要があって探偵小説のように謎めいた箇所があっては困る（可読性）
- 名前の重要性: 名前はコードの中での機能や目的を伝える最も基本的な部分。名前一つでコードの可読性が大きく変わる。
- 名前づけの課題: 名前づけの難しさ、それがプログラミングの難易度の一因にもなっている。
- リファクタリングの実践: 名前の変更が実際にどれほど頻繁に行われるのか、それに関連する手法（関数宣言の変更、変数名の変更）。
- 変更の躊躇: 名前を変更することに短期的な難しさがあったとしても、長期的には利益をもたらす。適切な名前は未来のトラブルや混乱を減少させる。
- 名前の変更と設計: 名前の変更が単なる表面的な作業でなく、深い設計の問題を示唆することがある。名前のリファクタリングを通じて、よりシンプルで効果的なコードへの道を見つけることができる。

リファクタリングの中で最もおこわれる作業が名前の変更

関数宣言の変更

```js
function circum(radius) {
  return 2 * Math.PI * radius;
}
```

↓

```js
function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

変数名の変更

```js
let a = height * width;
```

↓

```js
let area = height * width;
```

いい名前が思いつかない時は設計がまだ固まっていない兆候かもしれない。
設計を見直す or 名前を調整することでよりコードがシンプルになる可能性がある。

#### 小言

`rm-2h`とは... (https://martinfowler.com/bliki/TwoHardThings.html)

> コンピュータ・サイエンスで難しいことは 2 つしかない。キャッシュの無効化と名前付けだ。
> -- フィル・カールトン

## 重複したコード

コードにおける重複は、保守性や可読性を低下させる要因となる。同じ構造のコードが複数の場所に存在すると変更やバグ修正の際に複数の場所を同時に修正しなければならなくなり、その都度コードの整合性や一貫性を確認する手間が増える。

### 重複の問題点

- 重複するコードの部分を認識し、全てを一貫して変更することが必要。
- コードの修正や機能の追加時に、何箇所もの同じ構造のコードを変更しなければならなくなる。
- 似たようなコードが複数箇所に分散していると、その都度、違いや特殊なケースがないかを確認する手間が増える。

### どのようにして解決していくか？

関数の抽出、ステートメントのスライド、メソッドの引き上げ...

#### 関数の抽出

クラス内に同じ式やロジックが複数のメソッドで使われている場合、その部分を独立したメソッドとして切り出し、それを呼び出す形にすることで、コードの重複を排除する。

```js
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  // 明細の印字
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

↓

```js
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }
}
```

#### ステートメントのスライド

同じデータ構造にアクセスするコードが複数行あった際、他データ構造にアクセスするコードと混在させずに関連するコードだけをまとめるべき

```js
const pricingPlan = retrievePrincingPlan();
const order = retreiveOrder();
let charge;
const chargPerUnit = pricingPlan.unit;
```

↓

```js
const pricingPlan = retrievePrincingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
```

## 長い関数

### 問題点

- 可読性: 長い関数は、一度にすべての内容を把握するのが難しい。逆に、小さい関数はその目的や動作を迅速に理解できる。
- 再利用: 小さい関数は特定のタスクに特化しているため、他の場所でも再利用がしやすい。
- テスト性: 小さい関数は単体テストが行いやすく、エラーの発見も容易。

---

- 長い関数はコードの可読性や保守性に影響。
- 短い関数を持ったプログラムは長く充実した寿命を持つ。
- 関数の長さよりも、関数の名前とその実装の明確性が重要。
- 長い関数を分割する主な手法は「関数の抽出」。
- コメントや上限分岐、ループも抽出の対象として考慮。
- 名前を適切に付けることで、コードの意図を明確にする。
- 開発環境やツールを活用して、関数の定義と呼び出しを追跡。

#### 関数の抽出の障壁

パラメータや一時変数が多すぎると、関数の抽出が難しくなる。必要に応じて一時変数の置き換えやパラメータオブジェクトの導入を検討すべき。

## 長いパラメータリスト

「長いパラメータリスト」は、プログラムのコードの可読性や維持性に影響を与える要因の一つです。プログラミングの初期段階では、データをパラメータとして渡す方法が主流であり、グローバル変数を避けるための策として採用されました。しかしこの長いパラメータリストも、グローバル変数同様に問題を引き起こす可能性がある。

- 長いパラメータリストのデメリット
- リファクタリングの方法
- クラスを活用

## グローバルなデータ

リスク 💀
グローバルなデータ特にグローバル変数はソフトウェア開発の初期からそのリスクが認識されてはいた。
これらのデータはコードベース全体からアクセスや変更が可能でそれにより不具合の原因となりやすい。
グローバル変数以外にも、クラス変数や Singleton パターンなど、グローバルなデータを持つ構造はこのリスクを孕んでいる。

[Singleton パターンとは](https://qiita.com/shoheiyokoyama/items/c16fd547a77773c0ccc1)

> 生成するインスタンスの数を 1 つに制限するデザインパターン

- グローバルなデータのリスク
- 関連する問題
- リファクタリングの手法
- 変更可能性とそのリスク
- パラケルススの格言

## 変更可能なデータ

- 変更可能なデータの危険性
  - データの変更は、他の部分で予期せぬ結果を生む可能性がある。これは複雑なソフトウェアでは特に問題となる。
- 関数型プログラミングの利点
  - データの不変性を持つ関数型プログラミングは、多くのバグを予防する。不変性はデータの安全性を高め、副作用を減少させる。
  -
- カプセル化の重要性
  - データやその変更を適切にカプセル化することで、データの変更を監視しやすくし、その影響を最小限に抑えることができる
- 計算可能なデータの取り扱い
- スコープの狭さの重要性
  - データの変更が行われる範囲やスコープが狭ければ狭いほど、その影響やリスクは小さい。スコープの広がりには注意が必要。

#### Immutability x 関数型プログラミング

```js
// 純粋関数: 同じ入力に対して常に同じ出力を返し、副作用がない
const add = (a, b) => a + b;

// 高階関数: 関数を引数として取ったり、関数を返す関数
const multiplyBy = (factor) => (number) => number * factor;

// 不変データの例
const numbers = [1, 2, 3];

// 既存の配列を変更するのではなく、新しい配列を返す関数
const appendNumber = (arr, number) => {
  return [...arr, number];
};

const newNumbers = appendNumber(numbers, 4);

console.log(numbers); // [1, 2, 3]
console.log(newNumbers); // [1, 2, 3, 4]
```

`appendNumber`関数は元の配列`numbers`を変更しないで新しい要素を追加した新しい配列を返す。これにより`numbers`の不変性が保たれる。

## 変更の偏り

- 変更の偏りとは
  - 一つのモジュールが異なる目的で、異なる方法で変更されること。
  - 一つのモジュールが異なる理由で、複数回変更されることは効率的ではなく、リファクタリングの必要があるサイン
- 変更の偏りの問題点
  - データベースと金融商品の処理は異なるコンテキストに存在している
  - それぞれの変更は独立して考えるべき
  - 別々のコンテキストを一緒に処理するのは難しい（脳が混乱しそう）

ソフトウェアの構造を変更しやすい形にする。
変更が必要なとき、変更点を一か所に限定して修正する

```js
class UserReport {
  constructor(user) {
    this.user = user;
  }

  getReportData() {
    // ユーザーに関する何らかのデータを取得
    // 例: 購入履歴, ログイン履歴, etc.
  }

  renderHTML() {
    // レポートデータをHTMLでレンダリング
  }

  renderJSON() {
    // レポートデータをJSONでレンダリング
  }
}
```

この UserReport クラスは、ユーザーのレポートデータを取得するロジックとそれをさまざまな形式でレンダリングするロジックを持っている。したがってデータ取得の方法が変わった場合やレンダリングのスタイルや形式が変わった場合にこのクラスを変更する必要が出てくる。

リファクタリングのアプローチとしてはデータの取得とレンダリングの 2 つの責任を分離すべき

```js
class UserData {
  constructor(user) {
    this.user = user;
  }

  getReportData() {
    // ユーザーに関する何らかのデータを取得
  }
}

class ReportRenderer {
  constructor(data) {
    this.data = data;
  }

  renderHTML() {
    // データをHTMLでレンダリング
  }

  renderJSON() {
    // データをJSONでレンダリング
  }
}
```

## 変更の分散

「変更の偏り」とは異なり、変更の際に複数のモジュールを少しずつ書き換える状況。
一つの変更が多くの場所で必要になる場合。

**問題点**

修正箇所が散在すると、どこを変更するか探すのが難しい。
忘れて変更を実装しない場合が生じる可能性がある。

- 「変更の分散」と「変更の偏り」の違いは？
  - 「偏り」は一つのモジュールが異なる目的で変更されること、一方で「分散」は一つの変更が複数の場所にまたがること。
- リファクタリングを行った結果長いメソッドや、長いクラスが結果としてできてしまうかもしれない...
  - あとから意味のある形で抽出を行えばいい
  - 小さい関数やクラスを求めていくのが理想系だが途中過程で大きなものが出来てしまうのは問題ではない

## 特性の横恋慕

データとそれに関連する振る舞いが一緒に存在することを指す言葉、オブジェクト指向プログラミングの中心的な考え方の一つ
モジュールの関数が他のモジュールの関数やデータ構造と頻繁にやり取りする現象。
内部とのやりとりが少なく、外部とのやり取りが多い状態。

**古典的な例**
一つの関数が他のオブジェクトの get メソッドを何度も呼び出している的な。

- 解決策
  - 関数の移動: 関数をデータに近いモジュールに移動させる。
  - 関数の抽出: ロジックの一部だけが外部モジュールとのやり取りを行っている場合、それを独立した関数として抽出する。
- 例外的なケース
  - 一つの関数が複数のモジュールのデータに依存している場合、どこに移動すべきかが難しい。この時、一つのモジュールに主要なデータを持たせ、関数をそのモジュールに移動させる。
- 振る舞いの変更について
  - データとその振る舞いが一緒に変更される傾向があるが振る舞いだけを外部に出して変更するケースもある。

```js
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }

  describe() {
    return `This is a circle with radius of ${this.radius} and area of ${this.area()}.`;
  }
}

// データ(radius)は変更せずに振る舞いのみを変更する
// areaやdescribeが振る舞いに該当する
```

## データの群れ

データが一緒に動く、または関連性を持っている場合、それらは一つの箇所にまとめられるべき。
データがクラスのフィールドやメソッドの[シグニチャ](https://zenn.dev/t_kitamura/articles/90bc98a3787044)など、様々な場所に分散していること。

- データの群れの整理:
  - クラスの抽出: 関連するフィールドを新しいオブジェクトやクラスにまとめる。
  - パラメータオブジェクトの導入: 関連するメソッドのパラメータを一つのオブジェクトにまとめる。
- オブジェクトの再考
  - オブジェクトが持つデータが意味を持たない場合、そのオブジェクト自体の再設計が必要。
- クラスの利点(芳香剤 🌹)
  - データだけでなく、関連する振る舞いもまとめることができる。 -開発速度の向上や重複の削減が期待できる。

## 基本データ型への執着

整数、浮動小数点、文字列などの、ほとんどのプログラミング言語に備わっている基本的なデータ型。

- プログラマは特定のドメインに適した基本的な型、例: 貨幣や座標、範囲などの導入を嫌がる傾向にある。
  - 🤔 既存のデータ型で十分という認識？複雑性の増加の懸念？とかがあるのかな。
- 文字列の濫用
  - 文字列が特定のデータを表現するための過度に使用される傾向。
  - 例: 電話番号。これは単なる文字の集まりではなく、適切な型を持つべき。
- 単位の曖昧さ
  - 距離や時間を示す数値があった場合（秒、時間、メートル等）その単位が何であるかが明示されていない限り誤解が生まれてしまう
  - 基本データ型には単位の情報までは組み込まれていないので数値が何を意味しているのかのコンテキストが必要

## 重複したスイッチ文

オブジェクト指向の純粋なエバンジェリストは、switch 文を邪悪とみなす。
一般的には、すべての switch 文や if 文はポリモーフィズムに置き換えるべきという主張がある。

- 過去の評価
  - 本書の初版では switch 文を条件なしで議論していたが、当時の文脈は 90 年代後半のポリモーフィズムの評価が低かった背景がある -この時期のメインの目的は、新しい考え方や技術への適応を促進することだった。
- 最近の傾向:
  - ポリモーフィズムが一般的に受け入れられており、スイッチ文そのものが問題とされるわけではなくなった。
  - 多くのプログラミング言語は、基本データ型を超えた洗練された switch 文をサポートしている。
- 問題点と解決策:
  - 重複した switch 文、またはネストした if/else 文が複数の箇所に存在する場合、それはリファクタリングのサイン。
  - 重複する条件分岐の問題は、新しい条件を追加するたびに、すべての場所を更新する必要があること。
  - [ポリモーフィズム](https://medium-company.com/%E3%83%9D%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%95%E3%82%A3%E3%82%BA%E3%83%A0/)はこのような冗長性を排除し、コードの品質を向上させる強力なツール。
    の関数（メソッド）の呼び出しに対し、オブジェクト毎に異なる動作をする

## ループ

プログラミング言語の初期からループは中心的な役割を果たしてきた。
しかし、現代のプログラミング環境では、その重要性が薄れつつある。(for, if やら)

- 現在のトレンド
  - 現在、多くのプログラミング言語が第一級関数をサポート。
  - 「パイプラインによるループの置き換え」が一般的になりつつあり、旧式のループ構造は時代遅れとなりつつある。🤔
- パイプライン操作の利点
  - filter, map などのパイプライン操作を使用すると、処理対象と処理内容を迅速に確認できる。
  - コードがより読みやすく、意図が明確になる。

## 怠け者の要素

- 不要な構造
  - 構造が冗長、不要になるケースも存在している
    - 本体と同名の関数、一つのメソッドのみを持つクラス等々
- リファクタリングの役割
  - ある時点で有用だった構造も時間が経つにつれて存在意義が失われることがある
  - 関数のインライン化やクラスのインライン化を用いて不要な構造を取り除く

プログラムは常に変化している、どのタイミングでリファクタリングをすべき？は常に議論する必要はありそう。

**関数のインライン化の例**

呼ばれる関数の return を呼び出し側に置き換えるだけ

```js
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

↓

```js
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

## 疑わしき一般化

「いつか必要になるだろう」という先見の明に基づいて導入されるが、実際には使用されない機能や仕掛け。

- リスク
  - 無用な機能や仕掛けが導入されることでソフトウェアが複雑で保守しにくくなる。
- 抽象クラスが余計であれば「クラス階層の平坦化」。
- 無駄な委譲は「関数のインライン化」や「クラスのインライン化」で削除。
- 未使用の関数パラメータは「関数宣言の変更」で除去。
- テストケースのみで使用されるクラスや関数は「デッドコードの削除」。

**YAGNI (You Aren't Gonna Need It) と「疑わしき一般化」**
疑わしき一般化は YAGNI の原ソックに反するもの
システムの複雑さを不必要に増加させる必要がある

## 一時的属性

インスタンス変数の値が特定の状況でのみ設定されるクラスの属性。
通常の状況では使用されず、冗長であり、コードの可読性を低下させる。

- コードの解読が難しくなり、開発者の混乱やミスを招く可能性がある。

コード例

```js
class Order {
  constructor(item, quantity) {
    this.item = item;
    this.quantity = quantity;
    this.shipmentDate = null; // この属性は、オーダーが出荷された場合のみ意味を持つ
  }

  ship(date) {
    if (!date) {
      throw new Error('A shipment date is required!');
    }
    this.shipmentDate = date;
  }

  isShipped() {
    return this.shipmentDate !== null;
  }
}

const order1 = new Order('laptop', 2);
order1.ship('2023-09-01');
console.log(order1.isShipped()); // true
```

shipmentDate が一時的属性になっておりすべてのオーダーが出荷されるわけではない、この属性が常に意味を持っているわけではない。
shipmentDate を取り除いて新たに Shipment クラス？的なの定義して出荷に関する情報はそちらに持たせるべき

## メッセージの連鎖

オブジェクトから別のオブジェクトへ、メッセージが過度に伝播する現象。
getXxxx といったメソッドが続く形、または結果を一連の一時変数で受け取る形。

- クライアントがナビゲーション過程の構造に強く依存する。
- 中間のオブジェクトの変更時に、多くのクライアントに影響が及ぶ可能性。
  - デバッグが難しい、どの部分で発生したのか？が特定しづらい
- メッセージの連鎖を絶対に許容しないという考えは持たず、状況に応じた適切なリファクタリングの採用を推奨。

## 仲介人

オブジェクト指向におけるカプセル化の特性を活用した、一つのオブジェクトが他のオブジェクトへのアクセスや操作を中継する役割。

- クラスのメソッドが他のオブジェクトへの操作を中継するだけの場合、そのクラスが"仲介人"の役割だけを果たしている。
- 仲介人が過度に存在すると、システムの複雑性が増加し、理解・変更が難しくなる。

> カプセル化とは、オブジェクト指向プログラミングにおいて、互いに関連するデータの集合とそれらに対する操作をオブジェクトとして一つの単位にまとめ、外部に対して必要な情報や手続きのみを提供すること

仲介人の除去

```js
// PersonObjがdepartmentの内部実装に依存している
manager = aPerson.manager;

classPerson {
  get manager () { return this.department.manager}
}
```

↓

```js
// 直接プロパティにアクセス
manager = aPerson.department.manager;
```

双方にメリットデメリットはあるのでどちらを採用するかは要検討

## インサイダー取引

ソフトウェア開発におけるモジュール間の過度な情報交換や相互依存を指す。
この現象は、モジュールの独立性を損ない、変更や拡張が困難になる原因となる。

- モジュール間での情報のやり取りが活発になると、一つの変更が他のモジュールにも影響を与える可能性が高まる。
- 継承を利用する際、サブクラスがスーパークラスの詳細を過度に知ってしまう問題。
- 「関数の移動」や「フィールドの移動」を使って、モジュール間の過度な情報交換を最小限にする。
- 共通の興味を持つモジュール間での情報交換は、「委譲の隠蔽」や第三のモジュールを導入して対処。
- 継承の問題に対しては、「委譲によるサブクラスの書き換え」や「委譲によるスーパークラスの置き換え」を適用。

## 巨大なクラス

一つのクラスが多くの仕事を担当。
インスタンス変数の過剰。
重複コードの存在。

- クラスが持っているインスタンス変数のすべてを利用していない場合、抽出を繰り返し検討する。
- なぜ小さなクラスが望ましいのか
  - 単一責任の原則、可読性、再利用性、変更の容易さ、テストの容易さ...etc

## クラスのインターフェース不一致

クラスを使うことで得られる最大の利点 → 他クラスへの置き換えが可能になる（ただしインターフェースが一致している場合に限る）

インターフェースが異なる場合関数宣言の変更やらを使って合わせる必要がある。

## データクラス

- データクラスは属性と get/set メソッド以外には何も持たない。
- これらのクラスは単なるデータ保持用で、他のクラスから頻繁にアクセスされる。
- 早い段階で「レコードのカプセル化」を行うことが推奨される。
- 変更してはいけない属性がある場合は、「setter の削除」をする。
- データクラスに振る舞いを追加するために、どこで get/set メソッドが使われているかを調査し、「関数の移動」または「関数の抽出」を考慮する。
- データクラスの存在は、多くの場合、振る舞いが不適切な場所にあることを示唆している。
- クライアントからデータクラスへの振る舞いの移動は、コードの改善に役立つ。
- ただし、特定の関数の結果としてのレコードなど、例外も存在する。

## 相続拒否

サブクラスが親クラスの属性や操作の一部のみを使用する場面。
典型的には、継承階層が間違っている可能性を示唆。

- 継承とその問題点
  - サブクラスが継承した属性や操作を全て利用しない場合継承階層に問題がある可能性が高い。このような場合にはリファクタリングが必要となる。(メソッドの押し下げ、フィールドの押し下げ)
- 継承階層の問題を解決するための方法として、兄弟クラスの作成やメソッド・フィールドの移動が挙げられる。これにより、スーパークラスは共通の属性や操作のみを保持することができる。
- 継承はコードの再利用を目的として利用されるが、必ずしも最良の選択とは限らない。継承を使用する際には、その利点と限界を理解し、適切な場面で使用することが重要。

## コメント

コメントは悪いものではなく、むしろ価値がある。
しかし、過度なコメントはコードの質の低さを示唆することがある。

- 消臭剤としてのコメント
  - コメントが複雑なコードをカバーするために使用されることがある
- リファクタリングした後は多くのコメントは不要になることが多い
- コメントを減少させるためには？
  - コードの一部を説明するためにコメントがある場合関数の抽出を試みる
  - コメントがあっても関数がわかりにくい場合関数宣言の変更を検討する
  - 特定の状態やルールを明示する場合、アサーションの導入を検討する
- 適切な使い方
  - 不明瞭な点や理由をコメントとして記録しておく。
  - なぜ特定の処理が選択されたのかの理由をコメントとして残しておくことが役立つ。
