<!DOCTYPE html>
<html>
<head>
    <title>サブスクリプションの決済方法更新</title>
    <meta charset="utf-8">
</head>
<body>
<h1>サブスクリプションの決済方法更新</h1>
<p>以下のサブスクリプションの決済方法が更新されました</p>
<p>商品名：{{ $data->getProduct() }}</p>
<p>カード会社：{{ $data->getBrand() }}</p>
<p>下4桁：{{ $data->getLast4() }}</p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>