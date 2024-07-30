import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
  @Get('/')
  getAllReports(@CurrentUser() user: User) {
    console.log(user)
    return [
      {
        id: 1,
        report: true,
      },
    ];
  }
}
