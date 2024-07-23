import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  // allowing a service to use within the module by using DI so we don't need to create instance of service by own
  providers: [PowerService],
  // it mean we want make this service available for other module, if they need it, we can export multiple service
  exports: [PowerService]  
})
export class PowerModule {}
