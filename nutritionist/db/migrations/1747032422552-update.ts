import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1747032422552 implements MigrationInterface {
    name = 'Update1747032422552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('upcoming', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("appointmentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointmentDateTime" TIMESTAMP NOT NULL, "meetLink" character varying NOT NULL, "emailSent" boolean NOT NULL DEFAULT false, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'upcoming', "nutritionistId" uuid, "clientId" uuid, "requestId" uuid, CONSTRAINT "PK_16345caffd6ea5e1a799639b012" PRIMARY KEY ("appointmentId"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("clientId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUserId" uuid, CONSTRAINT "REL_042199f4b3a7c4bc9363cfb585" UNIQUE ("userUserId"), CONSTRAINT "PK_c8526f623c0beed53b60cb31bf5" PRIMARY KEY ("clientId"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_requests_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "appointment_requests" ("requestId" uuid NOT NULL DEFAULT uuid_generate_v4(), "preferredDateTime" TIMESTAMP NOT NULL, "message" text, "status" "public"."appointment_requests_status_enum" NOT NULL DEFAULT 'pending', "requestedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, "nutritionistId" uuid, CONSTRAINT "PK_46fc9eb40c112501fb249dec01c" PRIMARY KEY ("requestId"))`);
        await queryRunner.query(`CREATE TABLE "nutritionists" ("nutritionistId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUserId" uuid, CONSTRAINT "REL_6513d05e51ab4a2d175ce17417" UNIQUE ("userUserId"), CONSTRAINT "PK_94a5842c655238e311e9f19d071" PRIMARY KEY ("nutritionistId"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_usertype_enum" AS ENUM('CLIENT', 'NUTRITIONIST')`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userType" "public"."users_usertype_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0fbe9193577a989f160ed7c5d46" FOREIGN KEY ("nutritionistId") REFERENCES "nutritionists"("nutritionistId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_c4dbd8eb292b83b5dc67be3cf45" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_dbe60b700582884f2ac07070726" FOREIGN KEY ("requestId") REFERENCES "appointment_requests"("requestId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_042199f4b3a7c4bc9363cfb5852" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_requests" ADD CONSTRAINT "FK_8e49e358208d341e239872367e5" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_requests" ADD CONSTRAINT "FK_a3570e8c7c6b85b045e6614899b" FOREIGN KEY ("nutritionistId") REFERENCES "nutritionists"("nutritionistId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nutritionists" ADD CONSTRAINT "FK_6513d05e51ab4a2d175ce174178" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nutritionists" DROP CONSTRAINT "FK_6513d05e51ab4a2d175ce174178"`);
        await queryRunner.query(`ALTER TABLE "appointment_requests" DROP CONSTRAINT "FK_a3570e8c7c6b85b045e6614899b"`);
        await queryRunner.query(`ALTER TABLE "appointment_requests" DROP CONSTRAINT "FK_8e49e358208d341e239872367e5"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_042199f4b3a7c4bc9363cfb5852"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_dbe60b700582884f2ac07070726"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_c4dbd8eb292b83b5dc67be3cf45"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0fbe9193577a989f160ed7c5d46"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
        await queryRunner.query(`DROP TABLE "nutritionists"`);
        await queryRunner.query(`DROP TABLE "appointment_requests"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
    }

}
