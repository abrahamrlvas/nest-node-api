import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import configuration from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: async (configService: ConfigType<typeof configuration>) => ({
        transport: {
          host: configService.hostMail,
          port: 465,
          secure: true,
          auth: {
            user: configService.userMail,
            pass: configService.passwordMail,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      })
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}