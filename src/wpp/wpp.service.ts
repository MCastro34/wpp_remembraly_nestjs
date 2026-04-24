import { Injectable } from '@nestjs/common';
import { Task } from '../../generated/prisma';
import { TaskService } from '../task/task.service';

@Injectable()
export class WppService {
  constructor(private readonly _taskService: TaskService) {}

  verifyWebhook(mode: string, token: string) {
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

  async dailyReminder() {
    const todos: Task[] = await this._taskService.getTasks();
    if (todos.length === 0) {
      await this.sendMessage(
        process.env.WPP_USER!,
        'No pending tasks as of today.',
      );
    } else {
      // Group tasks and prepare message
    }
    return todos;
  }

  private sendMessage(to: string, message: string) {
    return fetch(
      `${process.env.WPP_MESSAGE_API}/${process.env.WPP_BUSINESS_ACCOUNT_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: {
            body: message,
          },
        }),
      },
    );
  }
}
