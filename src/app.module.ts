import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
