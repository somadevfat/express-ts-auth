import { Request, Response } from "express";
import { ItemService } from "../services/Item.service";
import { BadRequestError } from "@/utils/errors/CustomError";
import { ItemQueryParams } from "../domain/types/ItemQueryParams";

export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  createItem = async (req: Request, res: Response): Promise<Response> => {
    const newItem = await this.itemService.create(req.body);
    return res.status(201).json(newItem);
  };

  getAllItems = async (req: Request, res: Response): Promise<Response> => {
    // クエリパラメータを型安全に取得
    const queryParams: ItemQueryParams = {};

    // 文字列パラメータ
    if (req.query.name_like && typeof req.query.name_like === 'string') {
      queryParams.name_like = req.query.name_like;
    }

    // 数値パラメータ
    if (req.query.price_gte && typeof req.query.price_gte === 'string') {
      const priceGte = parseInt(req.query.price_gte, 10);
      if (!isNaN(priceGte)) {
        queryParams.price_gte = priceGte;
      }
    }

    if (req.query.price_lte && typeof req.query.price_lte === 'string') {
      const priceLte = parseInt(req.query.price_lte, 10);
      if (!isNaN(priceLte)) {
        queryParams.price_lte = priceLte;
      }
    }

    if (req.query.price_gt && typeof req.query.price_gt === 'string') {
      const priceGt = parseInt(req.query.price_gt, 10);
      if (!isNaN(priceGt)) {
        queryParams.price_gt = priceGt;
      }
    }

    if (req.query.price_lt && typeof req.query.price_lt === 'string') {
      const priceLt = parseInt(req.query.price_lt, 10);
      if (!isNaN(priceLt)) {
        queryParams.price_lt = priceLt;
      }
    }

    if (req.query.limit && typeof req.query.limit === 'string') {
      const limit = parseInt(req.query.limit, 10);
      if (!isNaN(limit)) {
        queryParams.limit = limit;
      }
    }

    if (req.query.page && typeof req.query.page === 'string') {
      const page = parseInt(req.query.page, 10);
      if (!isNaN(page)) {
        queryParams.page = page;
      }
    }

    const items = await this.itemService.findAll(queryParams);
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

    const updatedItem = await this.itemService.update(itemId, req.body);
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

