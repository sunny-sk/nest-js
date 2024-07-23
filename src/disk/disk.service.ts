import { PowerService } from './../power/power.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) { }
  
  getData() {
    this.powerService.supplyPower(5);
    console.log('using 5 watt from power supply');
    return "momory:2TB, ram:10TB"
  }
}
