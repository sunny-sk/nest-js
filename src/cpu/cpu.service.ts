import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number): number {
    this.powerService.supplyPower(10);
    console.log('using 10 watt from power supply');
    return a + b;
  }
}
