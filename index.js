// expressモジュールを使用する宣言を行います
const express = require("express");

// expressのインスタンスを作成
const app = express();

// JSON形式のデータを扱うことを、宣言します
app.use(express.json());




// お客様情報
const customers = [
    {title: "田中", id: 1},
    {title: "佐藤", id: 2},
    {title: "鈴木", id: 3},
    {title: "山田", id: 4},
];

// listenを開始します。
app.listen(8000, console.log("サーバーが起動しました。"));

// クライアントからのGETリクエストに対するエントリーを作成します
app.get("/", (req, res) => {

    res.send("getリクエスト");
}); 


// REST/APIのGETリクエストに対する実装を行います
// URLは自由に定義します。ここでは /api/customers とします
app.get("/api/customers", (req, res) => {
    // お客様情報をjsonデータでクライアントに返します。
    res.send(customers);
}); 

// 指定したIDの情報を返すAPIを作成
//  クライアントが指定したパラメータは、URLにコロン（:）パラメータ名　と記載します。
app.get("/api/customers/:id", (req, res) => {
    // customers配列から、クライアントが指定したidと一致する情報を検索
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
        // 存在しない
        res.status(404).send("<h2>Not Found</h2>");
    }
    // 存在する
    res.send(customer);
  });

// データ追加用にPOSTメソッドを実装します
app.post("/api/customers", (req, res) => {
    // 新規に追加するデータを準備します。
    const customer = {
        id: customers.length + 1, // idを採番します。
        title: req.body.title,    // クライアントが指定した顧客名
    };
    // 顧客情報の配列に追加します。
    customers.push(customer);
    // お客様情報をjsonデータでクライアントに返します。
    res.send(customers);
});

//データ更新用にPOSTメソッドを実装します。
app.put("/api/customers/:id", (req, res) => {
    // クライアントが指定したidの顧客情報を検索
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).send("<h2>Not Found</h2>");
    }
    customer.title = req.body.title;
    res.send(customer);
});
//データ削除用にDELETEメソッドを実装します。
app.delete("/api/customers/:id", (req, res) => {
    // クライアントが指定したidの顧客情報を検索
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
      res.status(404).send("<h2>Not Found</h2>");
    }
  
    //最初に現れた配列のインデックスを返す
    const index = customers.indexOf(customer);
    customers.splice(index, 1); //指定した配列を1つだけ削除する。
  
    res.send(customer);
  });