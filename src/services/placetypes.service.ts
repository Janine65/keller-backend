import { Service } from 'typedi';
import { CreatePlacetypeDto } from '@dtos/placetypes.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { placetype } from '@models/init-models';

@Service()
export class PlacetypeService {
  public async findAllPlacetype(): Promise<placetype[]> {
    const allPlacetype: placetype[] = await placetype.findAll();
    return allPlacetype;
  }

  public async findPlacetypeById(placetypeId: string): Promise<placetype> {
    const findPlacetype: placetype = await placetype.findByPk(placetypeId);
    if (!findPlacetype) throw new GlobalHttpException(409, "placetype doesn't exist");

    return findPlacetype;
  }

  public async createPlacetype(placetypeData: CreatePlacetypeDto): Promise<placetype> {
    const findPlacetype: placetype = await placetype.findOne({ where: { name: placetypeData.name } });
    if (findPlacetype) throw new GlobalHttpException(409, `This name ${placetypeData.name} already exists`);

    const createPlacetypeData: placetype = await placetype.create({... placetypeData});
    return createPlacetypeData;
  }

  public async updatePlacetype(placetypeId: string, placetypeData: CreatePlacetypeDto): Promise<placetype> {
    const findPlacetype: placetype = await placetype.findByPk(placetypeId);
    if (!findPlacetype) throw new GlobalHttpException(409, "placetype doesn't exist");

    await placetype.update({...placetypeData}, { where: { id: placetypeId } });

    const updatePlacetype: placetype = await placetype.findByPk(placetypeId);
    return updatePlacetype;
  }

  public async deletePlacetype(placetypeId: string): Promise<placetype> {
    const findPlacetype: placetype = await placetype.findByPk(placetypeId);
    if (!findPlacetype) throw new GlobalHttpException(409, "placetype doesn't exist");

    await placetype.destroy({ where: { id: placetypeId } });

    return findPlacetype;
  }
}
