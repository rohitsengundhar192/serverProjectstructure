import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WOWGalleryService } from '../../services/uplaod-file-master/wow-gallery.service';
import { ResponseInterface } from 'src/models/interface/response.interface';

import { Body, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('wow-Gallery')
export class WOWGalleryController {
  constructor(
    private _wowgallery: WOWGalleryService,
    private _auth_service: AuthService,
  ) {}

  @Get('get--token-gen')
  async getTOkenGen(
    // @Query('customer_id') customer_id: number,
    // @Query('country_code') country_code: string,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const payload = {
        user_id: 1,
        customer_id: 33,
        timezone: 'Asia/Kolkata',
        login_id: 1,
        country_code: 'in',
        parent_id: 101,
      };
      const token = await this._auth_service.generateJwt(payload);
      return {
        statusCode: 200,
        message: 'Get data successful',
        data: token,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('get-uploaded-image')
  async getuploadedimage(
    @Query('country_code') country_code: string,
    @Query('customer_id') customer_id: number,
    @Query('gallery_file_category') gallery_file_category: string,
    @Query('login_id') login_id: number,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      let token;
      if (req.headers.authorization)
        token = String(req.headers.authorization).replace('Bearer ', '');
      if (req.headers.authenticationtoken)
        token = String(req.headers.authenticationtoken).replace('Bearer ', '');
      const _data = await this._auth_service
        .verifyJwt(token)
        .then((data) => data.user);
      const {} = _data;

      const data = await this._wowgallery.getuploadedimage(
        country_code,
        customer_id,
        gallery_file_category,
        login_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  //get description
  @ApiBearerAuth('JWT-auth')
  @Get('get-desc')
  async getdesc(
    @Query('country_code') country_code: string,
    @Query('customer_id') customer_id: number,
    @Query('gallery_file_id') gallery_file_id: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      let token;
      if (req.headers.authorization)
        token = String(req.headers.authorization).replace('Bearer ', '');
      if (req.headers.authenticationtoken)
        token = String(req.headers.authenticationtoken).replace('Bearer ', '');
      const _data = await this._auth_service
        .verifyJwt(token)
        .then((data) => data.user);
      const {} = _data;

      const data = await this._wowgallery.getdesc(
        country_code,
        customer_id,
        gallery_file_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('get-all')
  async getinstitutionalphovidtableindtour(
    @Query('country_code') country_code: string,
    @Query('customer_id') customer_id: number,
    @Query('gallery_file_category') gallery_file_category: string,
    @Query('login_id') login_id: number,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      let token;
      if (req.headers.authorization)
        token = String(req.headers.authorization).replace('Bearer ', '');
      if (req.headers.authenticationtoken)
        token = String(req.headers.authenticationtoken).replace('Bearer ', '');
      const _data = await this._auth_service
        .verifyJwt(token)
        .then((data) => data.user);
      const {} = _data;

      const data = await this._wowgallery.getinstitutionalphovidtableindtour(
        country_code,
        customer_id,
        gallery_file_category,
        login_id
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('get-login-user-details')
  async getloginuserdetails(
    @Query('country_code') country_code: string,
    @Query('customer_id') customer_id: number,
    @Query('gallery_cloud_file_id') gallery_cloud_file_id: number,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      let token;
      if (req.headers.authorization)
        token = String(req.headers.authorization).replace('Bearer ', '');
      if (req.headers.authenticationtoken)
        token = String(req.headers.authenticationtoken).replace('Bearer ', '');
      const _data = await this._auth_service
        .verifyJwt(token)
        .then((data) => data.user);
      const {} = _data;

      const data = await this._wowgallery.getloginuserdetails(
        country_code,
        customer_id,
        gallery_cloud_file_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
