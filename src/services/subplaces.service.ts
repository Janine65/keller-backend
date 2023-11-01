import { Service } from 'typedi';
import { CreateSubplaceDto } from '@dtos/subplaces.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { subplace } from '@models/init-models';

@Service()
export class SubplaceService {
  public async findAllSubplace(): Promise<subplace[]> {
    const allSubplace: subplace[] = await subplace.findAll();
    return allSubplace;
  }

  public async findSubplaceById(subplaceId: string): Promise<subplace> {
    const findSubplace: subplace = await subplace.findByPk(subplaceId);
    if (!findSubplace) throw new GlobalHttpException(409, "subplace doesn't exist");

    return findSubplace;
  }

  public async createSubplace(subplaceData: CreateSubplaceDto): Promise<subplace> {
    const findSubplace: subplace = await subplace.findOne({ where: { name: subplaceData.name, placeid: subplaceData.placeid } });
    if (findSubplace) throw new GlobalHttpException(409, `This name ${subplaceData.name} already exists`);

    const createSubplaceData: subplace = await subplace.create({... subplaceData});
    return createSubplaceData;
  }

  public async updateSubplace(subplaceId: string, subplaceData: CreateSubplaceDto): Promise<subplace> {
    const findSubplace: subplace = await subplace.findByPk(subplaceId);
    if (!findSubplace) throw new GlobalHttpException(409, "subplace doesn't exist");

    await subplace.update({...subplaceData}, { where: { id: subplaceId } });

    const updateSubplace: subplace = await subplace.findByPk(subplaceId);
    return updateSubplace;
  }

  public async deleteSubplace(subplaceId: string): Promise<subplace> {
    const findSubplace: subplace = await subplace.findByPk(subplaceId);
    if (!findSubplace) throw new GlobalHttpException(409, "subplace doesn't exist");

    await subplace.destroy({ where: { id: subplaceId } });

    return findSubplace;
  }
}
