import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      //whitelist ignora todas as propriedades de forma silenciosa que não estiver no dto
      //forbiden lana o erro se for enviado algo fora do dto
      whitelist:true,
      forbidNonWhitelisted:true,
    })
  )
  await app.listen(3000);
}
bootstrap();
