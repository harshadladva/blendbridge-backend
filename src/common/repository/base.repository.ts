import { BadRequestException } from '@nestjs/common';
import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';
import { ErrorMessages } from '../types/base.enum';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterOption: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterOption, {
        ...projection,
        _id: 0,
      })
      .exec();
  }

  async find(
    entityFilterOption?: FilterQuery<T>,
    pagination?: Record<string, unknown>,
    projection?: Record<string, unknown>
  ): Promise<T[] | null> {
    return this.entityModel
      .find(entityFilterOption, {
        ...projection,
      })
      .skip(+pagination?.skip)
      .limit(+pagination?.limit);
  }

  async findWithOptions(aggregation?): Promise<unknown> {
    try {
      return await this.entityModel.aggregate(aggregation);
    } catch (e) {
      throw new BadRequestException({
        message: ErrorMessages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async totalCount(entityFilterOption?: FilterQuery<T>): Promise<number> {
    return this.entityModel.find(entityFilterOption).count();
  }

  async create(createEntityData: AnyKeys<T> & AnyObject): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterOption: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterOption,
      updateEntityData,
      { new: true }
    );
  }

  async deleteOne(entityFilterOption: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterOption);
    return deleteResult.deletedCount >= 1;
  }

  async insertMany(entityFilterOption: FilterQuery<T>): Promise<any> {
    return await this.entityModel.insertMany(entityFilterOption);
  }

  async updateMany(
    entityFilterOption: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    options: object = {}
  ): Promise<unknown> {
    return this.entityModel.updateMany(
      entityFilterOption,
      updateEntityData,
      options
    );
  }

  async findByIdAndRemove(
    entityFilterOption: FilterQuery<T>
  ): Promise<T | null> {
    return this.entityModel.findByIdAndRemove(entityFilterOption);
  }
}
