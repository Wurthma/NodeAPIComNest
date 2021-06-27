import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';
import { GLOBAL_SECRETS } from './secrets';

const connectionString = `mongodb://${GLOBAL_SECRETS.mongodbUser}:${GLOBAL_SECRETS.mongodbPassword}@${GLOBAL_SECRETS.mongodbHost}:${GLOBAL_SECRETS.mongodbPort}/ndstr?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true, 
    }),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
