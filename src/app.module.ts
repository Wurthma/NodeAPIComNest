import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { GLOBAL_SECRETS } from './secrets';
import { StoreModule } from './modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const connectionString =
  `mongodb://${GLOBAL_SECRETS.mongodbUser}:${GLOBAL_SECRETS.mongodbPassword}@${GLOBAL_SECRETS.mongodbHost}:${GLOBAL_SECRETS.mongodbPort}/${GLOBAL_SECRETS.mongodbDatabase}?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: GLOBAL_SECRETS.postgresHost,
      port: GLOBAL_SECRETS.postgresPort,
      username: GLOBAL_SECRETS.postgresUser,
      password: GLOBAL_SECRETS.postgresPassword,
      database: GLOBAL_SECRETS.postgresDatabase,
      entities: [__dirname + '/**/*entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
