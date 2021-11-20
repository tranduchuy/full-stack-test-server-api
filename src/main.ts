import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Handler, Context, Callback} from 'aws-lambda';
//import serverlessExpress from '@vendia/serverless-express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000)
}

bootstrap();

//let server: Handler;

//async function bootstrap(): Promise<Handler> {
    //const app = await NestFactory.create(AppModule);
    //await app.init();

    //const expressApp = app.getHttpAdapter().getInstance();
    //return serverlessExpress({ app: expressApp });
//}

//export const handler: Handler = async (
    //event: any,
    //context: Context,
    //callback: Callback,
//) => {
    //server = server ?? (await bootstrap());
    //return server(event, context, callback);
//};
