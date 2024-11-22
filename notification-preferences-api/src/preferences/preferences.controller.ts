
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dtos/create-preference.dto';
import { UpdatePreferenceDto } from './dtos/update-preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  createPreference(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':userId')
  getPreference(@Param('userId') userId: string) {
    return this.preferencesService.findByUserId(userId);
  }

  @Patch(':userId')
  updatePreference(
    @Param('userId') userId: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(userId, updatePreferenceDto);
  }

  @Delete(':userId')
  deletePreference(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
