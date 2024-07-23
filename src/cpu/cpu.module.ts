import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  providers: [CpuService],

  // by adding this, the current module as access of all exported services of different imported modules 
  // in this case CPU module has access of Power module service, note: only those service which is expoted in power modules not all
  imports: [PowerModule], 

  exports: [CpuService]
})
export class CpuModule {}
