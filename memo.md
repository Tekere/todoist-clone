# 記事構成

※プロジェクトについては触れない

完成形を見せる
firebase router vux 解説付き

inbox taskList taskModal を解説

today fewdays 解説 ＋ まとめ

# 疑問点

日付の色分けのコードがスマートではない気がする
main.js の created と単一ファイルコンポーネントの created が順番になるようにしたい。
mount を非同期の後に実行するようにしたが、それではローディング画面等が積めない
タスクの並べ替えを実装したい
タスクを並び替えたときにキャッシュクリアしても、記憶させておく方法が分からない
transition をネストする方法

# 学習したこと

firebase のデータは response.data.document.fields の中にある。
その中もオブジェクトで integerValue や stringValue の中にデータがある
integerValue なのに文字列になっているので 比較や if 文で使うときは"0"とする必要がある
イベント修飾子 self
mixins:の指定は配列で書くこと
