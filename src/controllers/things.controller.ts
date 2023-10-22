import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { Thing } from '@/models/thing';

export class ThingsController {
  public auth = Container.get(AuthService);


}
