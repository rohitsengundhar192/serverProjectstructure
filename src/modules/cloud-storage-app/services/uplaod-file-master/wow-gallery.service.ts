import { Injectable } from '@nestjs/common';
import { QP_UploadFileMaster } from '../../query-procedures/qp_upload-file-master';
import { dbConnection } from 'src/app.module';
import { HelperService } from 'src/common/services/helper/helper.service';

@Injectable()
export class WOWGalleryService {
  constructor(
    private _QP_UploadFileMaster: QP_UploadFileMaster,
    private _helpersevice: HelperService,
  ) {}
  async getuploadedimage(
    country_code,
    customer_id,
    gallery_file_category,
    login_id,
  ) {
    let insert_datas: any[] = []; // Initialize an array to collect data

    try {
      let table_data: any;

      if (
        (await this._helpersevice.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `21_userapp_wow_gallery_managment `,
        )) == 1
      ) {
        let loginbaseddata = await dbConnection.query(`
        SELECT gallery_file_upload_id FROM
        ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_file_tagged_users_list
        where tagged_user_id = ${login_id}
        ORDER BY gallery_file_upload_id DESC;
        `);

        for (let p = 0; p < loginbaseddata.length; p++) {
          const element = loginbaseddata[p].gallery_file_upload_id;

          if (gallery_file_category == 'all') {
            console.log('all');

            let table_data_1 = await dbConnection.query(`
            SELECT DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,gallery_file_description,gallery_cloud_file_id,gallery_file_upload_id,academic_year FROM 
            ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment 
            where gallery_file_upload_id = ${loginbaseddata[p].gallery_file_upload_id}
            ORDER BY gallery_file_upload_id ASC;
                  `);

            // Check if the query result is not empty before adding to insert_datas
            if (table_data_1.length > 0) {
              insert_datas = insert_datas.concat(table_data_1);
            }
          } else {
            console.log('not all');
            let table_data_2 = await dbConnection.query(`
            SELECT DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,gallery_file_description,gallery_cloud_file_id,gallery_file_upload_id,academic_year FROM ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment 
            where gallery_file_category=${gallery_file_category} and gallery_file_upload_id = ${loginbaseddata[p].gallery_file_upload_id}
            ORDER BY gallery_file_upload_id ASC;
                  `);

            // Check if the query result is not empty before adding to insert_datas
            if (table_data_2.length > 0) {
              insert_datas = insert_datas.concat(table_data_2);
            }
          }
        }

        // Return the accumulated data as a single array of objects
        return insert_datas;
      } else {
        console.log('no table found');
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }

  async getdesc(country_code, customer_id, gallery_file_category) {
    let table_data: any[] = [];

    try {
      if (
        (await this._helpersevice.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `21_userapp_wow_gallery_managment `,
        )) == 1
      ) {
        table_data = await dbConnection.query(`
        SELECT gallery_file_description FROM ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment
        where gallery_file_upload_id = ${gallery_file_category};
                  `);

        return table_data;
      } else {
        console.log('no table found');
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }

  async getinstitutionalphovidtableindtour(
    country_code,
    customer_id,
    gallery_file_category,
    login_id,
  ) {
    let table_data: any[] = [];
    let insert_datas: any[] = []; // Initialize an array to collect data
    try {
      if (
        (await this._helpersevice.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `21_userapp_wow_gallery_managment `,
        )) == 1
      ) {
        let loginbaseddata = await dbConnection.query(`
        SELECT gallery_file_upload_id FROM
        ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_file_tagged_users_list
        where tagged_user_id = ${login_id}
        ORDER BY gallery_file_upload_id DESC;
        `);

        for (let p = 0; p < loginbaseddata.length; p++) {
          const element = loginbaseddata[p].gallery_file_upload_id;

          if (gallery_file_category == 'all') {
            console.log('all');

            let table_data_1 = await dbConnection.query(`
            SELECT  DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,
            gallery_file_description,
            gallery_cloud_file_id,
            gallery_file_upload_id,
            gallery_file_category  FROM 
            ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment 
            where gallery_file_upload_id = ${loginbaseddata[p].gallery_file_upload_id}
            ORDER BY gallery_file_upload_id DESC;
                  `);

            // Check if the query result is not empty before adding to insert_datas
            if (table_data_1.length > 0) {
              insert_datas = insert_datas.concat(table_data_1);
            }
          } else {
            console.log('not all');
            let table_data_2 = await dbConnection.query(`
            SELECT DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,
            gallery_file_description,
            gallery_cloud_file_id,
            gallery_file_upload_id,
            gallery_file_category  FROM ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment 
            where gallery_file_category=${gallery_file_category} and gallery_file_upload_id = ${loginbaseddata[p].gallery_file_upload_id}
            ORDER BY gallery_file_upload_id DESC;
                  `);

            // Check if the query result is not empty before adding to insert_datas
            if (table_data_2.length > 0) {
              insert_datas = insert_datas.concat(table_data_2);
            }
          }
        }

        // Return the accumulated data after the loop
        return insert_datas;

        // if (gallery_file_category == 'all') {
        //   console.log('all');

        //   table_data = await dbConnection.query(`
        //   SELECT
        //   DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,
        //   gallery_file_description,
        //   gallery_cloud_file_id,
        //   gallery_file_upload_id,
        //   gallery_file_category
        //   FROM
        //   ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment
        //   ORDER BY
        //   gallery_file_upload_id DESC;
        //         `);
        // } else {
        //   console.log('not all');
        //   table_data = await dbConnection.query(`
        //   SELECT
        //   DATE_FORMAT(gallery_file_upload_datetime, '%Y-%m-%d %H:%i:%s') as gallery_file_upload_datetime,
        //   gallery_file_description,
        //   gallery_cloud_file_id,
        //   gallery_file_upload_id,
        //   gallery_file_category
        //   FROM
        //   ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment
        //   WHERE
        //   gallery_file_category = ${gallery_file_category}
        //  ORDER BY
        //   gallery_file_upload_id DESC;
        //         `);
        // }

        // return table_data;
      } else {
        console.log('no table found');
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }

  //get uploaded id
  async getloginuserdetails(
    country_code,
    customer_id,
    gallery_cloud_file_id: number,
  ) {
    let user_details: any[] = [];
    let user_category_id_aut: any;
    let auth: any;
    let user_details_push: any[] = [];
    let global_table: any;

    try {
      if (
        (await this._helpersevice.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `21_userapp_wow_gallery_managment`,
        )) == 1
      ) {
        if (
          (await this._helpersevice.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `2_userapp_registered_users_registered_categories`,
          )) == 1
        ) {
          if (
            (await this._helpersevice.tableExists(
              `${country_code}_${customer_id}_edu_customer_db`,
              `user_profile`,
            )) == 1
          ) {
            user_details = await dbConnection.query(`
            SELECT gallery_file_uploaded_by_user_id FROM ${country_code}_${customer_id}_edu_customer_db.21_userapp_wow_gallery_managment where gallery_cloud_file_id=${gallery_cloud_file_id} `);

            for (let i = 0; i < user_details.length; i++) {
              const element = user_details[i];

              if (user_details[i].gallery_file_uploaded_by_user_id != null) {
                const user_profile2 = await dbConnection.query(
                  `SELECT * FROM ${country_code}_${customer_id}_edu_customer_db.user_profile a
                  inner join ${country_code}_${customer_id}_edu_customer_db.2_userapp_registered_users_registered_categories b
                  on a.user_id = b.user_id
                  where a.user_id=${user_details[i].gallery_file_uploaded_by_user_id}; `,
                );
                user_category_id_aut = user_profile2[0]?.user_category_id;
                //category
                let category_table_length = await dbConnection.query(`
                select * from ${country_code}_${customer_id}_edu_customer_db.2_userapp_user_category
                `);
                let result1_aut = user_category_id_aut;
                let AlldataforStudent: any[] = [];
                for (let i = 0; i < category_table_length.length; i++) {
                  let result_aut = await dbConnection.query(`
                  SELECT * FROM ${country_code}_${customer_id}_edu_customer_db.2_userapp_user_category 
                  where user_category_id='${result1_aut}';     
                    `);
                  if (result_aut.length > 0) {
                    result1_aut = result_aut[0].parent_user_category_id;
                    AlldataforStudent.push(result_aut[0].user_category_name);
                  }
                }
                if (user_profile2.length > 0) {
                  auth = {
                    first_name: user_profile2[0].first_name,
                    last_name: user_profile2[0].last_name,
                    category_aut: AlldataforStudent.reverse()
                      .toString()
                      .replace(/,/g, '/'),
                    customer_image:
                      user_profile2[0]
                        .previous_login_image_of_the_day_ceph_object_id,
                  };
                }
                user_details_push.push({
                  user_details: user_details[i],
                  reply: auth,
                });
                auth = null;
              } else {
                user_details_push.push({
                  user_details: user_details[i],
                  reply: auth,
                });
              }
              return user_details_push;
            }
          } else {
            console.log('no table found');
            return 1;
          }
        } else {
          console.log('no table found');
          return 1;
        }
      } else {
        console.log('no table found');
        return 1;
      }
    } catch (error) {
      throw error;
    }
  }
}
