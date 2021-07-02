import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { GLOBAL_SECRETS } from './secrets';
import { StoreModule } from './modules/store/store.module';

const connectionString = `mongodb://${GLOBAL_SECRETS.mongodbUser}:${GLOBAL_SECRETS.mongodbPassword}@${GLOBAL_SECRETS.mongodbHost}:${GLOBAL_SECRETS.mongodbPort}/petshop?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true, 
    }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
