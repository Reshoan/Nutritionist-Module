import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1746820723884 implements MigrationInterface {
    name = 'Initial1746820723884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("client_id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password_hash" character varying(255) NOT NULL, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("appointment_id" SERIAL NOT NULL, "appointment_date" date NOT NULL, "appointment_time" TIME NOT NULL, "meet_link" character varying(255) NOT NULL, "calendar_event_id_client" character varying(255), "calendar_event_id_nutritionist" character varying(255), "nutritionist_id" integer, "client_id" integer, CONSTRAINT "PK_ee9f73735a635356d4da9bd3e69" PRIMARY KEY ("appointment_id"))`);
        await queryRunner.query(`CREATE TABLE "nutritionist" ("nutritionist_id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password_hash" character varying(255) NOT NULL, CONSTRAINT "UQ_2fc73f9a5e346cd07cea322f09b" UNIQUE ("email"), CONSTRAINT "PK_0c1c22c177522e260b8e0acac72" PRIMARY KEY ("nutritionist_id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_0bcc145c772303ec68fe0e6fcea" FOREIGN KEY ("nutritionist_id") REFERENCES "nutritionist"("nutritionist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_86361ca7754614e2602af531c74" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_86361ca7754614e2602af531c74"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_0bcc145c772303ec68fe0e6fcea"`);
        await queryRunner.query(`DROP TABLE "nutritionist"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
