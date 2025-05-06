import { MigrationInterface, QueryRunner } from "typeorm";

export class Clientandappointmentupdate1746537953908 implements MigrationInterface {
    name = 'Clientandappointmentupdate1746537953908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('client', 'admin', 'nutritionist')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{client}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('pending', 'confirmed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("appointment_id" SERIAL NOT NULL, "appointment_date" TIMESTAMP NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'pending', "google_calendar_event_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientClientId" integer NOT NULL, "nutritionistNutritionistId" integer NOT NULL, CONSTRAINT "PK_dde485d1b7ca51845c075befb6b" PRIMARY KEY ("appointment_id"))`);
        await queryRunner.query(`CREATE TABLE "nutritionists" ("nutritionist_id" SERIAL NOT NULL, "certifications" text array, "specializations" text array, "experience_years" integer NOT NULL, "profile_picture_url" character varying, "availability_schedule" jsonb, "user_id" integer, CONSTRAINT "PK_e2654a095308bf8c2986060099e" PRIMARY KEY ("nutritionist_id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("client_id" SERIAL NOT NULL, "goal" character varying NOT NULL, "diet_preference" character varying NOT NULL, "allergies" text, "medical_conditions" text, "user_id" integer, "nutritionist_id" integer, CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id"))`);
        await queryRunner.query(`CREATE TABLE "meal_plans" ("meal_plan_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "notes" text, "meals" json NOT NULL, "clientClientId" integer NOT NULL, "nutritionistNutritionistId" integer NOT NULL, CONSTRAINT "PK_b2116b49b3f21895961e226f476" PRIMARY KEY ("meal_plan_id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_6fd8f0f1b505761860b0053e4e8" FOREIGN KEY ("clientClientId") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_fbc7710ec8652cd74f7262df1bb" FOREIGN KEY ("nutritionistNutritionistId") REFERENCES "nutritionists"("nutritionist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nutritionists" ADD CONSTRAINT "FK_cdc7f2fd783c952d05c2d086749" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e66773ddb4529c507c3960ee27" FOREIGN KEY ("nutritionist_id") REFERENCES "nutritionists"("nutritionist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD CONSTRAINT "FK_4887da1eeca4587ae9548e9f793" FOREIGN KEY ("clientClientId") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plans" ADD CONSTRAINT "FK_b0e92545fec76d44cff79ea7a6c" FOREIGN KEY ("nutritionistNutritionistId") REFERENCES "nutritionists"("nutritionist_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP CONSTRAINT "FK_b0e92545fec76d44cff79ea7a6c"`);
        await queryRunner.query(`ALTER TABLE "meal_plans" DROP CONSTRAINT "FK_4887da1eeca4587ae9548e9f793"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e66773ddb4529c507c3960ee27"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_f18a6fabea7b2a90ab6bf10a650"`);
        await queryRunner.query(`ALTER TABLE "nutritionists" DROP CONSTRAINT "FK_cdc7f2fd783c952d05c2d086749"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_fbc7710ec8652cd74f7262df1bb"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_6fd8f0f1b505761860b0053e4e8"`);
        await queryRunner.query(`DROP TABLE "meal_plans"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "nutritionists"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    }

}
