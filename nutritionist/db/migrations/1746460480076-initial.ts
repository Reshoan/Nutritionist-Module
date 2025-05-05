import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1746460480076 implements MigrationInterface {
    name = 'Initial1746460480076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nutritionists" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying, "bio" text, "profilePictureUrl" character varying, "specialization" character varying(100), "yearsOfExperience" integer NOT NULL DEFAULT '0', "location" character varying, "rating" double precision NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_64f4b43fddabdfc2392b5ea6207" UNIQUE ("email"), CONSTRAINT "PK_c8166e82215bfbd26bd5ef1d0dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nutritionists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
