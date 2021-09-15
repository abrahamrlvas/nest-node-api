import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './settings/database.module';
import { PackagesModule } from './modules/packages/packages.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './mail/mail.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        MAIL_HOST:Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required()
      }),
    }),
    DatabaseModule,
    PackagesModule,
    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
