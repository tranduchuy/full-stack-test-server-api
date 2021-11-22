import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context, Callback } from 'aws-lambda';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     cors: {
//       origin: '*',
//     },
//   });
//   //app.useGlobalPipes(new ValidationPipe())
//   await app.listen(3001, () => {
//     console.log('Running...');
//   });
// }

// bootstrap();

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('initializing server...')
  server = server ?? (await bootstrap());
  console.log('ready to handle request!');
  return server(event, context, callback);
};
