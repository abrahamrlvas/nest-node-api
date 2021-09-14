import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<string> {
    const client = this.packageRepository.create({ ...createPackageDto });
    this.packageRepository.save(client);
    return 'This action adds a new package';
  }

  async findAll(): Promise<Package[]> {
    const packages = await this.packageRepository.find();
    if (packages.length < 1) {
      throw new NotFoundException('Packages not found');
    }
    return packages;
  }

  async findOne(id: number): Promise<Package> {
    const packageId = await this.packageRepository.findOne(id);
    if (!packageId) {
      throw new NotFoundException('Package not found');
    }
    return packageId;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const updateClient = this.packageRepository.update(id, {
      ...updatePackageDto,
    });
    return updateClient;
  }

  async remove(id: number): Promise<string> {
    const client = await this.findOne(id);
    await this.packageRepository.remove(client);
    return 'Package removed successfull';
  }
}
