import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getText(body: { text: string }) {
    console.log(body.text);
    return { message: 'Dobili smo poruku' };
  }
}
