# 記事構成

完成品画像・Gif など

使用したツール

データの取得方法
json ファイルから axios でとってくる

作ったファイルのコード添付＋軽く解説

# 疑問点

日付の色分けのコードがスマートではない気がする
main.js の created と単一ファイルコンポーネントの created が順番になるようにしたい。
mount を非同期の後に実行するようにしたが、それではローディング画面等が積めない

# 学習したこと

firebase のデータは response.data.document.fields の中にある。
その中もオブジェクトで integerValue や stringValue の中にデータがある
integerValue なのに文字列になっているので 比較や if 文で使うときは"0"とする必要がある
