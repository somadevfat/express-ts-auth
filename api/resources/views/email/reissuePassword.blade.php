<!DOCTYPE html>
<html>
<head>
    <title>パスワードのリセット</title>
    <meta charset="utf-8">
</head>
<body>
<h1>パスワードのリセット</h1>
<p>以下のリンクをクリックして、パスワードをリセットしてください。</p>
<p><a href="{{ env('APP_URL').'/user/reissue/password/?email_reissue_token='.$user->email_reissue_token ?? '' }}">パスワードをリセットする</a></p>
<p>もし心当たりがない場合、このメールを無視してください。</p>
<p>ありがとうございました。</p>
</body>
</html>