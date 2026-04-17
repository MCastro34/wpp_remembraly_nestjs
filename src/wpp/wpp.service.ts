import { Injectable } from '@nestjs/common';

@Injectable()
export class WppService {
  verifyWebhook(mode: string, token: string, challenge: string) {
    console.log(mode, token, challenge);
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('WEBHOOK VERIFIED');
      return true;
    } else {
      return false;
    }
  }

  receiveMessage(args: any) {
    console.log('Received message:\n', args);
    return 'Message received';
  }
}
