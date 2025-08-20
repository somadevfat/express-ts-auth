import { Request, Response } from "express";
import { ItemService } from "../services/Item.service";
import { safeValidateCreateItem } from "../domain/dtos/CreateItem.dto";
import { safeValidateUpdateItem } from "../domain/dtos/UpdateItem.dto";
import { BadRequestError } from "@/utils/errors/CustomError";

export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  createItem = async (req: Request, res: Response): Promise<Response> => {
    const result = safeValidateCreateItem(req.body);
    if (!result.success) {
      throw new BadRequestError(
        `Invalid input: ${JSON.stringify(result.error.flatten().fieldErrors)}`
      );
    }

    const newItem = await this.itemService.create(result.data);
    return res.status(201).json(newItem);
  };

  getAllItems = async (req: Request, res: Response): Promise<Response> => {
    const items = await this.itemService.findAll();
    return res.status(200).json(items);
  };

  getItemById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }

    const item = await this.itemService.findById(itemId);
    return res.status(200).json(item);
  };

  updateItem = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }

    const result = safeValidateUpdateItem(req.body);

    if (!result.success) {
      throw new BadRequestError(
        `Invalid input: ${JSON.stringify(result.error.flatten().fieldErrors)}`
      );
    }

    const updatedItem = await this.itemService.update(itemId, result.data);
    return res.status(200).json(updatedItem);
  };

  deleteItem = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      throw new BadRequestError("Invalid item ID");
    }

    await this.itemService.delete(itemId);
    return res.status(204).send();
  };
}
