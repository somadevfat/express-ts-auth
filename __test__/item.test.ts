// __test__/item.test.ts

import request from "supertest";
import app from "../src/app"; // appのインポートパスは環境に合わせて調整してください
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

describe("Item API: Admin POST and GET", () => {
  let adminToken: string;
  let createdItemId: number;

  // === 準備: 全てのテストの前に管理者でログイン ===
  beforeAll(async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "admin@example.com",
      password: "AdminPass123",
    });

    adminToken = response.body.token;
    expect(adminToken).toBeDefined(); // まずトークンが取得できているか確認
  });

  // === 後片付け: 全てのテストが終わったらDBを掃除 ===
  afterAll(async () => {
    // テストで作成したアイテムが残っていれば削除
    if (createdItemId) {
      await prisma.item.deleteMany({ where: { id: createdItemId } });
    }
    await prisma.$disconnect();
  });

  // === テストケース1: アイテムをPOSTで作成 ===
  it("should create a new item with an admin token", async () => {
    const response = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "テスト用アイテム",
        price: 12345,
        description: "POSTとGETをテストするためのアイテムです",
        image_url: "http://example.com/test-post-get.jpg",
      });

    expect(response.status).toBe(201); // 201 Created
    expect(response.body.name).toBe("テスト用アイテム");
    expect(response.body.id).toBeDefined();

    // 次のテストで使うために、作成されたアイテムのIDを保存
    createdItemId = response.body.id;
  });

  // === テストケース2: 作成したアイテムをGETで取得 ===
  it("should get the newly created item by its ID", async () => {
    // 前のテストでIDが取得できていない場合はスキップ
    if (!createdItemId) {
      throw new Error("Item ID was not created in the previous test");
    }

    const response = await request(app)
      .get(`/items/${createdItemId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200); // 200 OK
    expect(response.body.id).toBe(createdItemId);
    expect(response.body.price).toBe(12345);
  });
});
