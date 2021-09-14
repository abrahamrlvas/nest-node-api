import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt.strategy.guard';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    return {
      success: true,
      message: await this.packagesService.create(createPackageDto),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return {
      success: true,
      message: 'Package updated successfull',
      data: this.packagesService.update(+id, updatePackageDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      success: true,
      message: await this.packagesService.remove(+id),
    };
  }
}
