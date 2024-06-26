import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [DatabaseModule, UserModule, AdminModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
