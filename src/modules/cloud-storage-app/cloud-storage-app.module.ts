import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { QueryProceduresModule } from './query-procedures/query-procedures.module';
import { WOWGalleryController } from './controllers/wow-gallery/wow-gallery.controller';
import { WOWGalleryService } from './services/uplaod-file-master/wow-gallery.service';
import { HelperService } from 'src/common/services/helper/helper.service';

@Module({
  imports: [QueryProceduresModule, AuthModule],
  controllers: [WOWGalleryController ],
  providers: [WOWGalleryService, HelperService],
})
export class CloudStorageAppModule {}
// hi 