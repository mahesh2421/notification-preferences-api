
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';
import { CreatePreferenceDto } from './dtos/create-preference.dto';
import { UpdatePreferenceDto } from './dtos/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const newPreference = new this.userPreferenceModel(createPreferenceDto);
    return newPreference.save();
  }

  async findByUserId(userId: string): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel.findOne({ userId });
    if (!userPreference) {
      throw new NotFoundException('User preference not found');
    }
    return userPreference;
  }

  async update(
    userId: string,
    updatePreferenceDto: UpdatePreferenceDto,
  ): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updatePreferenceDto,
      { new: true },
    );
    if (!updatedPreference) {
      throw new NotFoundException('User preference not found');
    }
    return updatedPreference;
  }

  async delete(userId: string): Promise<{ message: string }> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('User preference not found');
    }
    return { message: 'User preference deleted successfully' };
  }
}
