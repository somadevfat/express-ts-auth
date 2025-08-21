<!DOCTYPE html>
<html>
<head>
    <title>サブスクリプションの決済失敗</title>
    <meta charset="utf-8">
</head>
<body>
<h1>サブスクリプションの決済失敗</h1>
<p>以下のサブスクリプションの決済に失敗しました</p>
<p>商品名：{{ $data->getProduct() }}</p>
<p>金額：{{ $data->getAmount() }}円</p>
<p>決済日：{{ $data->getDate() }}</p>
<p>お手数ですがお問い合わせフォームからお問い合わせください。</p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>