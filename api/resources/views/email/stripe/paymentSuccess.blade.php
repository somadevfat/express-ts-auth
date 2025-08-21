<!DOCTYPE html>
<html>
<head>
    <title>サブスクリプションの決済完了</title>
    <meta charset="utf-8">
</head>
<body>
<h1>サブスクリプションの決済完了</h1>
<p>以下のサブスクリプションの決済が完了しました</p>
<p>商品名：{{ $data->getProduct() }}</p>
<p>金額：{{ $data->getAmount() }}</p>
<p>決済日：{{ $data->getDate() }}</p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>