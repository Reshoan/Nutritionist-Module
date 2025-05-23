PGDMP                      }            nutritionistDB    17.4    17.4 '    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            h           1262    33636    nutritionistDB    DATABASE     v   CREATE DATABASE "nutritionistDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
     DROP DATABASE "nutritionistDB";
                     postgres    false                        3079    33637 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                        false            i           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                             false    2            k           1247    33681     appointment_requests_status_enum    TYPE     o   CREATE TYPE public.appointment_requests_status_enum AS ENUM (
    'pending',
    'approved',
    'rejected'
);
 3   DROP TYPE public.appointment_requests_status_enum;
       public               postgres    false            b           1247    33658    appointments_status_enum    TYPE     j   CREATE TYPE public.appointments_status_enum AS ENUM (
    'upcoming',
    'completed',
    'cancelled'
);
 +   DROP TYPE public.appointments_status_enum;
       public               postgres    false            t           1247    33703    users_usertype_enum    TYPE     U   CREATE TYPE public.users_usertype_enum AS ENUM (
    'CLIENT',
    'NUTRITIONIST'
);
 &   DROP TYPE public.users_usertype_enum;
       public               postgres    false            �            1259    33687    appointment_requests    TABLE     �  CREATE TABLE public.appointment_requests (
    "requestId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "preferredDateTime" timestamp without time zone NOT NULL,
    message text,
    status public.appointment_requests_status_enum DEFAULT 'pending'::public.appointment_requests_status_enum NOT NULL,
    "requestedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "clientId" uuid,
    "nutritionistId" uuid
);
 (   DROP TABLE public.appointment_requests;
       public         heap r       postgres    false    2    875    875            �            1259    33665    appointments    TABLE     �  CREATE TABLE public.appointments (
    "appointmentId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "appointmentDateTime" timestamp without time zone NOT NULL,
    "meetLink" character varying NOT NULL,
    "emailSent" boolean DEFAULT false NOT NULL,
    status public.appointments_status_enum DEFAULT 'upcoming'::public.appointments_status_enum NOT NULL,
    "nutritionistId" uuid,
    "clientId" uuid,
    "requestId" uuid
);
     DROP TABLE public.appointments;
       public         heap r       postgres    false    2    866    866            �            1259    33675    clients    TABLE     >   CREATE TABLE public.clients (
    "clientId" uuid NOT NULL
);
    DROP TABLE public.clients;
       public         heap r       postgres    false            �            1259    33649 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         heap r       postgres    false            �            1259    33648    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public               postgres    false    219            j           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public               postgres    false    218            �            1259    33697    nutritionists    TABLE     J   CREATE TABLE public.nutritionists (
    "nutritionistId" uuid NOT NULL
);
 !   DROP TABLE public.nutritionists;
       public         heap r       postgres    false            �            1259    33707    users    TABLE       CREATE TABLE public.users (
    "userId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "userType" public.users_usertype_enum NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false    2    884            �           2604    33652    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218    219            `          0    33687    appointment_requests 
   TABLE DATA           �   COPY public.appointment_requests ("requestId", "preferredDateTime", message, status, "requestedAt", "clientId", "nutritionistId") FROM stdin;
    public               postgres    false    222   �2       ^          0    33665    appointments 
   TABLE DATA           �   COPY public.appointments ("appointmentId", "appointmentDateTime", "meetLink", "emailSent", status, "nutritionistId", "clientId", "requestId") FROM stdin;
    public               postgres    false    220   �3       _          0    33675    clients 
   TABLE DATA           -   COPY public.clients ("clientId") FROM stdin;
    public               postgres    false    221   4       ]          0    33649 
   migrations 
   TABLE DATA           ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public               postgres    false    219   �4       a          0    33697    nutritionists 
   TABLE DATA           9   COPY public.nutritionists ("nutritionistId") FROM stdin;
    public               postgres    false    223   �4       b          0    33707    users 
   TABLE DATA           L   COPY public.users ("userId", name, email, password, "userType") FROM stdin;
    public               postgres    false    224   �5       k           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);
          public               postgres    false    218            �           2606    33674 +   appointments PK_16345caffd6ea5e1a799639b012 
   CONSTRAINT     x   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "PK_16345caffd6ea5e1a799639b012" PRIMARY KEY ("appointmentId");
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "PK_16345caffd6ea5e1a799639b012";
       public                 postgres    false    220            �           2606    33696 3   appointment_requests PK_46fc9eb40c112501fb249dec01c 
   CONSTRAINT     |   ALTER TABLE ONLY public.appointment_requests
    ADD CONSTRAINT "PK_46fc9eb40c112501fb249dec01c" PRIMARY KEY ("requestId");
 _   ALTER TABLE ONLY public.appointment_requests DROP CONSTRAINT "PK_46fc9eb40c112501fb249dec01c";
       public                 postgres    false    222            �           2606    33714 $   users PK_8bf09ba754322ab9c22a215c919 
   CONSTRAINT     j   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId");
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_8bf09ba754322ab9c22a215c919";
       public                 postgres    false    224            �           2606    33656 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public                 postgres    false    219            �           2606    33701 ,   nutritionists PK_94a5842c655238e311e9f19d071 
   CONSTRAINT     z   ALTER TABLE ONLY public.nutritionists
    ADD CONSTRAINT "PK_94a5842c655238e311e9f19d071" PRIMARY KEY ("nutritionistId");
 X   ALTER TABLE ONLY public.nutritionists DROP CONSTRAINT "PK_94a5842c655238e311e9f19d071";
       public                 postgres    false    223            �           2606    33679 &   clients PK_c8526f623c0beed53b60cb31bf5 
   CONSTRAINT     n   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "PK_c8526f623c0beed53b60cb31bf5" PRIMARY KEY ("clientId");
 R   ALTER TABLE ONLY public.clients DROP CONSTRAINT "PK_c8526f623c0beed53b60cb31bf5";
       public                 postgres    false    221            �           2606    33716 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public                 postgres    false    224            �           2606    33717 +   appointments FK_0fbe9193577a989f160ed7c5d46    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_0fbe9193577a989f160ed7c5d46" FOREIGN KEY ("nutritionistId") REFERENCES public.nutritionists("nutritionistId");
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "FK_0fbe9193577a989f160ed7c5d46";
       public               postgres    false    223    220    4799            �           2606    33737 3   appointment_requests FK_8e49e358208d341e239872367e5    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointment_requests
    ADD CONSTRAINT "FK_8e49e358208d341e239872367e5" FOREIGN KEY ("clientId") REFERENCES public.clients("clientId");
 _   ALTER TABLE ONLY public.appointment_requests DROP CONSTRAINT "FK_8e49e358208d341e239872367e5";
       public               postgres    false    221    222    4795            �           2606    33747 ,   nutritionists FK_94a5842c655238e311e9f19d071    FK CONSTRAINT     �   ALTER TABLE ONLY public.nutritionists
    ADD CONSTRAINT "FK_94a5842c655238e311e9f19d071" FOREIGN KEY ("nutritionistId") REFERENCES public.users("userId");
 X   ALTER TABLE ONLY public.nutritionists DROP CONSTRAINT "FK_94a5842c655238e311e9f19d071";
       public               postgres    false    224    4801    223            �           2606    33742 3   appointment_requests FK_a3570e8c7c6b85b045e6614899b    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointment_requests
    ADD CONSTRAINT "FK_a3570e8c7c6b85b045e6614899b" FOREIGN KEY ("nutritionistId") REFERENCES public.nutritionists("nutritionistId");
 _   ALTER TABLE ONLY public.appointment_requests DROP CONSTRAINT "FK_a3570e8c7c6b85b045e6614899b";
       public               postgres    false    222    4799    223            �           2606    33722 +   appointments FK_c4dbd8eb292b83b5dc67be3cf45    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_c4dbd8eb292b83b5dc67be3cf45" FOREIGN KEY ("clientId") REFERENCES public.clients("clientId");
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "FK_c4dbd8eb292b83b5dc67be3cf45";
       public               postgres    false    4795    220    221            �           2606    33732 &   clients FK_c8526f623c0beed53b60cb31bf5    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "FK_c8526f623c0beed53b60cb31bf5" FOREIGN KEY ("clientId") REFERENCES public.users("userId");
 R   ALTER TABLE ONLY public.clients DROP CONSTRAINT "FK_c8526f623c0beed53b60cb31bf5";
       public               postgres    false    221    4801    224            �           2606    33727 +   appointments FK_dbe60b700582884f2ac07070726    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_dbe60b700582884f2ac07070726" FOREIGN KEY ("requestId") REFERENCES public.appointment_requests("requestId");
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "FK_dbe60b700582884f2ac07070726";
       public               postgres    false    220    4797    222            `   �   x���;n�0E�ZZ70�Cr�di�Bٰl���TiR��W\�T1����DG�!�����1�M�)���W^���w�o���׷�=��w��y9ʾ}Z�vw׽�2]�������&���Q��%��1B0�A���*��܈k��&*�X�+!H��q�^c��zs	#�����P�Pk�F�D��i����N�0���3��q@�8@Z-P�2G��*�d��2��)}u�      ^      x������ � �      _   �   x��� Dѽ��#��d���K��ϻ#l�Uv�^��<\�rQ���J���X���P]��tr4�m�	����	�ա&v���65߯��x��V�Q�Sv�z�?�9&D,�����p�ly��}�'��w'f\Z���c� �_<      ]   '   x�3�447176056�431����,�L�A����� ʜ	      a   �   x��� ����<AT�%鿄��!f��P��z�y&��Y��y�Q}��6�Z!��`�$vZ�xd�V��v\Ƚ	%U�Ѷ,9���d�pAM>�g	5���#k��QF��4̨!g6�:J�Av�Paw^I��]�DŹ���������9�      b   �  x�m�Ko�:����8S��m�n� )��ҝ؎)�����>R9�1Z�R��y���J0�S@Ph�TF�06k.S�b����]�����60���/���W�����9��AO�QpM�Y���߽��p���w��΍r���K�G��55
�P&Հ0�!� �Nj%C���Y��"�U�>}���Z��ѭ�hIu3��8�nVdMz�����|��!,�β� ǡw�X�
�!L���Q�~���>��և�y�"��:7kY;l�ڡ�v?�k��8�]��6�Zٷ}5��#V
��?���=��"���{��� �UHkW�T]8&_��Ϊa�6���h(c[m�H��NΧ���;�Cllj���v�C�5 ŜRg�X�,'w}agY4(oL�����2�fC]tv>X�XMG�BmN���F˭�U�BG�o��N(g|L��Ě�"��g9��3�I�.�����j�w�P�`y���-�Y�.Y�;�����́:|�  B�8
	��H�a�,Σ`�ˢ4ٗE��a��}G�g@��t{��>A�喢�fKgG����e[	}>��oÚS���e���e�|�I<��Ǎ�):��ȗ��W"�dN �@���+j�Wy��m.�ս�26�j!Jf�:X�16|z�QY�>QK�ϲ��s�h����@HH�I	Î>�<B>m�~\O��+;b5s�c�`ʴƓ^�it�b�7[�y�]���d9t��A0Պ�&#|��%!�������b�?Nϰ
�ݺE1l�f([/��Q9/%?M�N�@�Ց����>�񧄵�
QB�
怔����
!	f�����<NϰƷFU�7�#�w�Q}Q�����n�;,'��ix�Պ�e�~�]���AJ!����Y[l@���r�G�#}��Ӵ%�U��7���Ӧ�<���K��6�
�s�v�x�i-��������?L<�     