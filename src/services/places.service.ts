import { Service } from 'typedi';
import { CreatePlaceDto } from '@dtos/places.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { place } from '@models/init-models';

@Service()
export class PlaceService {
  public async findAllPlace(): Promise<place[]> {
    const allPlace: place[] = await place.findAll();
    return allPlace;
  }

  public async findPlaceById(placeId: string): Promise<place> {
    const findPlace: place = await place.findByPk(placeId);
    if (!findPlace) throw new GlobalHttpException(409, "place doesn't exist");

    return findPlace;
  }

  public async createPlace(placeData: CreatePlaceDto): Promise<place> {
    const findPlace: place = await place.findOne({ where: { name: placeData.name, placetypeid: placeData.placetypeid } });
    if (findPlace) throw new GlobalHttpException(409, `This name ${placeData.name} already exists`);

    const createPlaceData: place = await place.create({... placeData});
    return createPlaceData;
  }

  public async updatePlace(placeId: string, placeData: CreatePlaceDto): Promise<place> {
    const findPlace: place = await place.findByPk(placeId);
    if (!findPlace) throw new GlobalHttpException(409, "place doesn't exist");

    await place.update({...placeData}, { where: { id: placeId } });

    const updatePlace: place = await place.findByPk(placeId);
    return updatePlace;
  }

  public async deletePlace(placeId: string): Promise<place> {
    const findPlace: place = await place.findByPk(placeId);
    if (!findPlace) throw new GlobalHttpException(409, "place doesn't exist");

    await place.destroy({ where: { id: placeId } });

    return findPlace;
  }
}
