import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { GeneralRoute } from './routes/general.route';
import { KellerRoute } from './routes/keller.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new GeneralRoute(), new KellerRoute()]);

app.listen();
