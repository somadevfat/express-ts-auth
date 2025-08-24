<!DOCTYPE html>
<html>
<head>
    <title>次回のサブスクリプション請求日のお知らせ</title>
    <meta charset="utf-8">
</head>
<body>
<h1>次回のサブスクリプション請求日のお知らせ</h1>
<p>以下の日程でサブスクリプションの請求が行われます</p>
<p>商品名：{{ $data->getProduct() }}</p>
<p>金額：{{ $data->getAmount() }}</p>
<p>請求日：{{ $data->getDate() }}</p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>