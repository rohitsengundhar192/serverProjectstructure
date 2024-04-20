import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/app.module";

@Injectable()
export class CheckConfig {
    async checkDatabase(dbname: string) {
        const DB = await dbConnection.query(`SELECT count(*) as dbname FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbname}'`)
        if (DB[0].dbname == 1) return 1; if (DB[0].dbname == 0) return 0
    }

    async checkTable(dbname: string, tbname: string) {
        const TB = await dbConnection.query(`
             SELECT count(*) as tbname
             FROM INFORMATION_SCHEMA.TABLES
             WHERE TABLE_SCHEMA = '${dbname}'
             AND TABLE_NAME = '${tbname}';
        `); if (TB[0].tbname == 1) return 1; if (TB[0].tbname == 0) return 0
    }
}