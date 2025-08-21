"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    // アイテムを全て取得する
    async findAll() {
        // 1. アイテムを全て取得
        return await this.itemRepository.findAll();
    }
    // IDでアイテムを検索する
    async findById(id) {
        return this.itemRepository.findById(id);
    }
    // アイテムを作成する
    async create(itemDto) {
        return this.itemRepository.create({
            name: itemDto.name,
            content: itemDto.content,
            price: itemDto.price,
            image: itemDto.image,
        });
    }
    // アイテムを更新する
    async update(id, itemDto) {
        const updateData = {};
        // 更新するフィールドのみを設定
        if (itemDto.name !== undefined)
            updateData.name = itemDto.name;
        if (itemDto.content !== undefined)
            updateData.content = itemDto.content;
        if (itemDto.price !== undefined)
            updateData.price = itemDto.price;
        if (itemDto.image !== undefined)
            updateData.image = itemDto.image;
        return this.itemRepository.update(id, updateData);
    }
    // アイテムを削除する
    async delete(id) {
        return this.itemRepository.delete(id);
    }
}
exports.ItemService = ItemService;
