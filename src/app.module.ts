import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { Auth } from './middleware/auth';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://newcor9:youtube-server-code@youtube-server.maijdmg.mongodb.net/NestDB?retryWrites=true&w=majority',
    ),
    UserModule,
    ResumeModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Auth).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
