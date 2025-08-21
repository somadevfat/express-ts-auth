"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const CreateItem_dto_1 = require("../domain/dtos/CreateItem.dto");
const UpdateItem_dto_1 = require("../domain/dtos/UpdateItem.dto");
const CustomError_1 = require("@/utils/errors/CustomError");
class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
        this.createItem = async (req, res) => {
            const result = (0, CreateItem_dto_1.safeValidateCreateItem)(req.body);
            if (!result.success) {
                throw new CustomError_1.BadRequestError(`Invalid input: ${JSON.stringify(result.error.flatten().fieldErrors)}`);
            }
            const newItem = await this.itemService.create(result.data);
            return res.status(201).json(newItem);
        };
        this.getAllItems = async (req, res) => {
            const items = await this.itemService.findAll();
            return res.status(200).json(items);
        };
        this.getItemById = async (req, res) => {
            const { id } = req.params;
            const itemId = parseInt(id, 10);
            if (isNaN(itemId)) {
                throw new CustomError_1.BadRequestError("Invalid item ID");
            }
            const item = await this.itemService.findById(itemId);
            return res.status(200).json(item);
        };
        this.updateItem = async (req, res) => {
            const { id } = req.params;
            const itemId = parseInt(id, 10);
            if (isNaN(itemId)) {
                throw new CustomError_1.BadRequestError("Invalid item ID");
            }
            const result = (0, UpdateItem_dto_1.safeValidateUpdateItem)(req.body);
            if (!result.success) {
                throw new CustomError_1.BadRequestError(`Invalid input: ${JSON.stringify(result.error.flatten().fieldErrors)}`);
            }
            const updatedItem = await this.itemService.update(itemId, result.data);
            return res.status(200).json(updatedItem);
        };
        this.deleteItem = async (req, res) => {
            const { id } = req.params;
            const itemId = parseInt(id, 10);
            if (isNaN(itemId)) {
                throw new CustomError_1.BadRequestError("Invalid item ID");
            }
            await this.itemService.delete(itemId);
            return res.status(204).send();
        };
    }
}
exports.ItemController = ItemController;
