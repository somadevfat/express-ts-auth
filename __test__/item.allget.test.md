# 設定
BASE="http://localhost:3000/api"
ADMIN_EMAIL="admin@lh.sandbox"   # 既定のシード管理者
ADMIN_PASSWORD="pass"            # 既定のシードパスワード

pp() { if command -v jq >/dev/null 2>&1; then jq; else cat; fi }

# 1) 管理者ログイン（トークン取得）
TOKEN=$(curl -sS -X POST "$BASE/auth/admin/signin" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | jq -r .token)

echo "TOKEN=${TOKEN}"
if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "管理者ログインに失敗しました。メール/パスワードを確認してください。"
  exit 1
fi

# 2) テストデータ投入（要: 管理者トークン）
curl -sS -X POST "$BASE/items" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"ボールペン","content":"テスト用のボールペン","price":120,"image":"http://example.com/pen.jpg"}' | pp

curl -sS -X POST "$BASE/items" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"ペンケース","content":"テスト用のペンケース","price":980,"image":"http://example.com/pencase.jpg"}' | pp

curl -sS -X POST "$BASE/items" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"pen stand","content":"テスト用のpen stand","price":1500,"image":"http://example.com/penstand.jpg"}' | pp

# 3) 動作確認（GETは認証不要）
echo; echo "== 全件 =="; curl -sS "$BASE/items" | pp

echo; echo "== name_like=ペン =="; curl -sS -G "$BASE/items" --data-urlencode "name_like=ペン" | pp

echo; echo "== name_like=pen =="; curl -sS -G "$BASE/items" --data-urlencode "name_like=pen" | pp

echo; echo "== 価格 1000〜2000 =="; curl -sS -G "$BASE/items" \
  --data-urlencode "price_gte=1000" --data-urlencode "price_lte=2000" | pp

echo; echo "== name_like=ペン + 価格 1000〜2000 =="; curl -sS -G "$BASE/items" \
  --data-urlencode "name_like=ペン" --data-urlencode "price_gte=1000" --data-urlencode "price_lte=2000" | pp