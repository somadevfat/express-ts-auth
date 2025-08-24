<!DOCTYPE html>
<html>
<head>
    <title>サブスクリプションの停止</title>
    <meta charset="utf-8">
</head>
<body>
<h1>サブスクリプションの停止</h1>
<p>以下のサブスクリプションを停止</p>
<p>商品名：{{ $data->getProduct() }}</p>
<p>金額：{{ $data->getAmount() }}円</p>
<p>停止日：{{ $data->getDate() }}</p>
<p>以下のリンクにアクセスし表示された返送手続きを実施してください</p>
<p><a href="{{ env('APP_URL').'XXXXX' }}">返送手続き</a></p>
<p><a href="{{ env('APP_URL').'XXXXX' }}">注意事項</a></p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>