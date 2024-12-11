import 'express-session';
import { UserPayload } from '.';

declare module 'express-session' {
  interface Session {
    user?: {
      id: string;
      username: string;
    };
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user: UserPayload;
  }
}
