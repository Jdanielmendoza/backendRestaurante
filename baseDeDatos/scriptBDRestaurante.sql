CREATE TABLE CATEGORIA(
	id UUID NOT NULL primary key ,
	nombre varchar(256) NOT NULL,
	descripcion VARCHAR(256) NULL,
	id_categoria UUID DEFAULT NULL , 
	FOREIGN KEY (id_categoria) REFERENCES categoria(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE 
);


CREATE TABLE PRODUCTO(
	id UUID NOT NULL PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL, 
	descripcion VARCHAR(256) NULL,
	precio DECIMAL(10,2) NOT NULL,
	stock INTEGER NOT NULL ,
	imagen VARCHAR(500) NOT NULL,
	id_categoria UUID NOT NULL, 
	FOREIGN KEY (id_categoria) REFERENCES categoria(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE 
);


CREATE TABLE MENU(
	id UUID NOT NULL PRIMARY KEY, 
	nombre VARCHAR(50) NOT NULL ,
	descripcion VARCHAR(256) NULL
);

CREATE TABLE MenuProducto(
	id_producto UUID NOT NULL ,
	id_menu UUID NOT NULL ,
	FOREIGN KEY (id_producto) REFERENCES producto(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	FOREIGN KEY (id_menu) REFERENCES menu(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE ,
	PRIMARY KEY(id_producto, id_menu)
);

CREATE TYPE dias AS ENUM('lunes','martes','miercoles','jueves','viernes','sabado','domingo');
CREATE TABLE dia(
	id UUID NOT NULL PRIMARY KEY,
	dia dias NOT NULL 	
);

CREATE TABLE menuDia(
	id_dia UUID NOT NULL, 
	id_menu UUID NOT NULL ,
	horaInicio TIME NOT NULL,
	horaFin TIME NOT NULL ,
	FOREIGN KEY (id_dia) REFERENCES dia(id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY (id_menu) REFERENCES menu(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	PRIMARY KEY(id_dia,id_menu)
);


CREATE TABLE mesa(
	id UUID NOT NULL PRIMARY KEY , 
	nro INTEGER NOT NULL ,
	nroSillas INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE tipoDePago(
	id UUID NOT NULL PRIMARY KEY , 
	nombre varchar(30) NOT NULL 
);

CREATE TABLE PERMISO(
	id UUID NOT NULL PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL,
	descripcion VARCHAR(256) NULL
);

CREATE TABLE ROL(
	id UUID NOT NULL PRIMARY KEY ,
	cargo VARCHAR(20) NOT NULL ,
	descripcion VARCHAR(256) NULL
);

CREATE TABLE RolPermiso(
	id_rol UUID NOT NULL,
	id_permiso UUID NOT NULL,
	FOREIGN KEY (id_rol) REFERENCES ROL(id) 
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	FOREIGN KEY (id_permiso) REFERENCES PERMISO(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
	
);

CREATE TYPE SEXOS AS ENUM('M','F');
CREATE TABLE usuario(
	ci VARCHAR(10) NOT NULL PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL, 
	fechaDeNacimiento DATE NOT NULL,
	telefono INTEGER NOT NULL,
	correo VARCHAR(60) NULL ,
	sexo SEXOS NOT NULL DEFAULT 'M',
	contraseña VARCHAR(200) NOT NULL ,
	id_rol UUID NOT NULL ,
	imagen VARCHAR(256) NULL ,
	FOREIGN KEY (id_rol) REFERENCES rol(id) 
	ON UPDATE CASCADE 
	ON DELETE CASCADE 
);
SELECT * FROM USUARIO;

CREATE TABLE INSUMOS(
	id UUID NOT NULL PRIMARY KEY ,
	nombre VARCHAR(60) NOT NULL ,
	cantidad INTEGER NOT NULL DEFAULT 1, 
	descripcion VARCHAR(256) NULL ,
	ci_usuario VARCHAR(10) NOT NULL,
	FOREIGN KEY (ci_usuario) REFERENCES usuario(ci)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);

CREATE TABLE NotaDeSalida(
	id UUID NOT NULL PRIMARY KEY ,
	descripcion VARCHAR(256) NULL,
	total DECIMAL(10,2) NOT NULL ,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ci_usuario VARCHAR(10) NOT NULL,
	FOREIGN KEY (ci_usuario) REFERENCES usuario(ci)
	ON UPDATE CASCADE 
	ON DELETE CASCADE 
);
CREATE TABLE detalleSalida(
	id_salida UUID NOT NULL ,
	id_producto UUID NOT NULL ,
	cantidad SMALLINT NOT NULL DEFAULT 1 ,
	total DECIMAL(10,2) NOT NULL ,
	descripcion VARCHAR(256) NULL , 
	
	FOREIGN KEY (id_salida) REFERENCES notaDeSalida(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE, 
	
	FOREIGN KEY (id_producto) REFERENCES producto(id) 
	ON UPDATE CASCADE 
	ON DELETE CASCADE, 
	
	PRIMARY KEY(id_salida , id_producto)
);


CREATE TYPE ESTADOS AS ENUM('pendiente','terminado','cancelado');
CREATE TABLE pedido(
	nro UUID NOT NULL PRIMARY KEY,
	estado ESTADOS NOT NULL DEFAULT 'pendiente' , 
	total DECIMAL(10,2) NOT NULL ,
	descuento DECIMAL(10,2) NOT NULL DEFAULT 0.00 ,
	detalle VARCHAR(256) NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	
	ci_usuario VARCHAR(10) NOT NULL,
	id_tipoDePago UUID NOT NULL ,
	id_mesa  UUID NOT NULL , 
	FOREIGN KEY (ci_usuario) REFERENCES usuario(ci)
	ON UPDATE CASCADE 
	ON DELETE CASCADE ,
	
	FOREIGN KEY (id_tipoDePago) REFERENCES tipoDePago(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE ,
	
	FOREIGN KEY (id_mesa) REFERENCES mesa(id) 
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);

CREATE TABLE detallePedido(
	nro_pedido UUID NOT NULL ,
	id_producto UUID NOT NULL,
	cantidad SMALLINT NOT NULL DEFAULT 1,
	Total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	
	FOREIGN KEY (nro_pedido) REFERENCES pedido(nro)
	ON UPDATE CASCADE 
	ON DELETE CASCADE, 
	
	FOREIGN KEY (id_producto) REFERENCES producto(id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE, 
	
	PRIMARY KEY(nro_pedido,id_producto)
);




/*-----------------------------------*/
/*---INSERTS EN LA BASE DE DATOS-----*/
/*-----------------------------------*/

--CATEGORIA
INSERT INTO CATEGORIA (id, nombre, descripcion, id_categoria) VALUES
    ('9027064c-84f2-4f09-8b59-ef6674c752e2', 'bebidas', 'catogoria de las bebidas', NULL),
    ('1d9f9ee1-1a3b-410e-8b9c-90d9b049e76f', 'sopa', '', NULL),
    ('6bc4ae5f-bf03-44c5-8ef1-b5d7ae9c9974', 'segundo', '', NULL),
    ('c5e86535-1fe8-4a07-95c2-5621df6bb3d5', 'postre', '', NULL),
    ('14b2ec3c-4d9c-4227-8ed2-68a098db10c5', 'no alcoholicas', '', '9027064c-84f2-4f09-8b59-ef6674c752e2'),
	('3bf964c5-241a-4780-ade8-cbcc173ecde2', 'gaseosas', '', '14b2ec3c-4d9c-4227-8ed2-68a098db10c5');			
	
--PRODUCTO
INSERT INTO PRODUCTO (id, nombre, descripcion, precio, stock, imagen, id_categoria) VALUES
    ('4a1e74bb-e7ca-49aa-b66e-39c935bac140', 'coca cola 2lts', '', 12, 25, 'https://th.bing.com/th/id/OIP.YFgoYng8NxUXK8a4pZ-nGQHaHa?pid=ImgDet&rs=1', '3bf964c5-241a-4780-ade8-cbcc173ecde2'),
    ('d864d5af-bf6f-4aec-975d-15a0dd4a8657', 'coca cola 3lts', '', 15, 30, 'https://th.bing.com/th/id/R.d36a8fffa1038533f82f410873b5c0fe?rik=gJK5QiIkAGzjvA&pid=ImgRaw&r=0', '3bf964c5-241a-4780-ade8-cbcc173ecde2'),
    ('29cebd23-37f9-465b-b957-87d82e6de50e', 'sprite 2lts', '', 12, 14, 'https://th.bing.com/th/id/OIP.JR98Gs0A94MZgaZrj6-tvwHaHa?pid=ImgDet&rs=1', '3bf964c5-241a-4780-ade8-cbcc173ecde2'),
    ('95d6f8f8-d7d1-48af-88dc-c97a07ea874f', 'fanta 2lts', '', 12, 13, 'https://th.bing.com/th/id/R.061cb8d2a043b53fccd2a60e994f9780?rik=5Jx1thU6it771Q&pid=ImgRaw&r=0', '3bf964c5-241a-4780-ade8-cbcc173ecde2'),
    ('f7bef8c7-57e7-442e-8722-8a722a15c37d', 'simba 2lts', '', 11, 12, 'https://th.bing.com/th/id/OIP.rVlDa3t75aFgMXIEGv3o_wHaHa?pid=ImgDet&rs=1', '3bf964c5-241a-4780-ade8-cbcc173ecde2'),
	('b4cb1db4-2a12-4670-9576-9af19abe057c', 'sopa de mani', '', 5, 20, 'https://th.bing.com/th/id/OIP.Elh8Dk3QqZW6mPMcWXVNbwHaE8?pid=ImgDet&rs=1', '1d9f9ee1-1a3b-410e-8b9c-90d9b049e76f'),
    ('ec92f22a-bc62-4ce7-b0e3-8b077c464ed2', 'locro de gallina', '', 5, 30, 'https://i.pinimg.com/736x/7a/f1/c2/7af1c2c9565bb6446d58d5bd57e53af9.jpg', '1d9f9ee1-1a3b-410e-8b9c-90d9b049e76f'),
    ('4cf287d6-5686-4881-bd63-591565d5b8fa', 'majadito de charque', '', 12, 14, 'https://th.bing.com/th/id/OIP.pEa3QPPBV9x31Bg6ubhjdAHaFp?pid=ImgDet&rs=1', '6bc4ae5f-bf03-44c5-8ef1-b5d7ae9c9974'),
    ('b6aa8762-b66c-414a-9c63-6d16cd40cc62', 'milanesa de pollo', '', 12, 13, 'https://th.bing.com/th/id/R.ba554f50a5d431290c193399095a4036?rik=06%2fbLC9HN5A%2f%2fg&pid=ImgRaw&r=0', '6bc4ae5f-bf03-44c5-8ef1-b5d7ae9c9974'),
    ('fe4a567e-f0c7-4de6-a27d-c0e96928e100', 'bife', '', 12, 12, 'https://th.bing.com/th/id/R.6fe16116e44277506653995f14f465b1?rik=A8XWtdrNh46jNA&riu=http%3a%2f%2fcocinadesdecasadotcom1.files.wordpress.com%2f2012%2f05%2f319907_285875834761392_285021594846816_1376655_666751_n2.jpg%3fw%3d450&ehk=VoEM6Nt4bxIId9CHVOfHksBa%2bpnTvC3XTLVrcc6XZog%3d&risl=&pid=ImgRaw&r=0', '6bc4ae5f-bf03-44c5-8ef1-b5d7ae9c9974');


--MENU
INSERT INTO MENU (id, nombre, descripcion) VALUES
    ('d07ef9e7-6d5c-43f3-83c5-2e4c38e94132', 'almuerzo', '""'),
    ('2ab1416a-ea4a-4d44-8664-04acec9a6bde', 'cena', '""');


--MENU PRODUCTO
INSERT INTO MenuProducto (id_producto, id_menu) VALUES
    ('4a1e74bb-e7ca-49aa-b66e-39c935bac140', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132'),
    ('29cebd23-37f9-465b-b957-87d82e6de50e', '2ab1416a-ea4a-4d44-8664-04acec9a6bde'),
    ('f7bef8c7-57e7-442e-8722-8a722a15c37d', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132'),
    ('ec92f22a-bc62-4ce7-b0e3-8b077c464ed2', '2ab1416a-ea4a-4d44-8664-04acec9a6bde'),
    ('b6aa8762-b66c-414a-9c63-6d16cd40cc62', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132');


--DIA
INSERT INTO dia (id, dia) VALUES
    ('eb314175-3248-4067-bd41-0ac950d482d0', 'lunes'),
    ('83d54a61-e36f-45a0-8c1d-fa45c1c990c7', 'martes'),
    ('1d35ce84-0c23-453b-abc6-21c4c3037ac1', 'miercoles'),
    ('727fe2fa-91c5-4eda-a1b6-fbe224275c18', 'jueves'),
    ('64552927-a1ad-4784-a485-84c4c46bc2fb', 'viernes');

--MENU DIA
INSERT INTO menuDia (id_dia, id_menu, horaInicio, horaFin) VALUES
    ('eb314175-3248-4067-bd41-0ac950d482d0', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132', '12:00:00', '15:00:00'),
    ('83d54a61-e36f-45a0-8c1d-fa45c1c990c7', '2ab1416a-ea4a-4d44-8664-04acec9a6bde', '12:00:00', '15:00:00'),
    ('1d35ce84-0c23-453b-abc6-21c4c3037ac1', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132', '17:00:00', '23:00:00'),
    ('727fe2fa-91c5-4eda-a1b6-fbe224275c18', '2ab1416a-ea4a-4d44-8664-04acec9a6bde', '17:00:00', '23:00:00'),
    ('64552927-a1ad-4784-a485-84c4c46bc2fb', 'd07ef9e7-6d5c-43f3-83c5-2e4c38e94132', '12:00:00', '15:00:00');


--MESA
 INSERT INTO mesa (id, nro, nroSillas) VALUES
    ('472a5caf-1798-4b53-8d21-4cbc28ad24d8', 1, 4),
    ('c3bcc4ff-7a2d-41e9-add9-a8decf43cf49', 2, 8),
    ('f78553f1-61e9-4d8e-a617-324409b148b6', 3, 12),
    ('f05df79a-dbbe-4fd7-83a8-c106fadca3e7', 4, 4),
    ('1d5d5243-7213-4e69-96ff-2de1968cc709', 5 , 8);

--TIPO DE PAGO
INSERT INTO tipoDePago (id, nombre) VALUES
    ('c9846a9f-ebe3-422c-bb8f-b04ab2461612', 'codigo QR'),
    ('8277df76-b3c3-4673-b36a-92befe26419e', 'tarjeta'),
    ('674e6ad6-e787-423b-ad54-e910a519bd45', 'Efectivo');

--PERMISOS
INSERT INTO PERMISO (id, nombre, descripcion) VALUES
    ('a00b55f3-a221-4e28-bd6a-3844c5a95525', 'editar', 'este permiso permitira editar una tabla dada'),
    ('e139cd7b-2e8e-4328-ae14-20413d264015', 'eliminar', ''),
    ('efa3ff30-b319-472f-9932-580e49209be7', 'actualizar', 'este permiso permite actualizar una tabla dada'),
    ('d102fe97-984f-4352-8d80-f9d052cc7338', 'obtener', '');
	
--ROL	
INSERT INTO ROL (id, cargo, descripcion) VALUES
    ('c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', 'administrador', '""'),
    ('bd77a31e-9bd4-4a9f-afd5-4cc4da45411d', 'cocinero', '""'),
    ('d85745e2-9cb8-421f-bd03-0a8033fddc2a', 'cajero', '""');
    	

--ROLPERMISO
INSERT INTO RolPermiso (id_rol, id_permiso) VALUES
    ('c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', 'a00b55f3-a221-4e28-bd6a-3844c5a95525'),
    ('c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', 'e139cd7b-2e8e-4328-ae14-20413d264015'),
    ('c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', 'efa3ff30-b319-472f-9932-580e49209be7'),
    ('c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', 'd102fe97-984f-4352-8d80-f9d052cc7338'),
    ('bd77a31e-9bd4-4a9f-afd5-4cc4da45411d', 'a00b55f3-a221-4e28-bd6a-3844c5a95525'),
    ('bd77a31e-9bd4-4a9f-afd5-4cc4da45411d', 'efa3ff30-b319-472f-9932-580e49209be7'),
    ('bd77a31e-9bd4-4a9f-afd5-4cc4da45411d', 'd102fe97-984f-4352-8d80-f9d052cc7338'),
   ('d85745e2-9cb8-421f-bd03-0a8033fddc2a', 'a00b55f3-a221-4e28-bd6a-3844c5a95525'),
    ('d85745e2-9cb8-421f-bd03-0a8033fddc2a', 'e139cd7b-2e8e-4328-ae14-20413d264015'),
    ('d85745e2-9cb8-421f-bd03-0a8033fddc2a', 'efa3ff30-b319-472f-9932-580e49209be7'),
    ('d85745e2-9cb8-421f-bd03-0a8033fddc2a', 'd102fe97-984f-4352-8d80-f9d052cc7338');
	
	
	
--USUARIO
INSERT INTO usuario (ci, nombre, telefono, fechaDeNacimiento, correo, sexo, contraseña, id_rol, imagen) VALUES
    ('12632281', 'Carlos Marca Peñaranda', 71024318, '06/17/2002', 'user1@example.com', 'M', 'password1', 'c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', NULL),
    ('14431988', 'Daniel Mendoza', 12345678, '08/21/2003', 'user2@example.com', 'M', 'password2', 'c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', NULL),
    ('7677176', 'javier mamani', 12345689, '03/01/2000', 'user3@example.com', 'M', 'password3', 'c60f1c68-3e53-4fa6-b75d-8e22dd720e2f', NULL),
    ('4722938', 'ronald cuña', 12345323, '04/01/2003', 'user4@example.com', 'M', 'password4', 'bd77a31e-9bd4-4a9f-afd5-4cc4da45411d', NULL),
    ('8733092', 'micael salazar', 567890, '05/04/2000', 'user5@example.com', 'M', 'password5', 'd85745e2-9cb8-421f-bd03-0a8033fddc2a', NULL);

--INSUMOS
INSERT INTO insumos (id, nombre, cantidad, descripcion, ci_usuario) VALUES
    ('1abea8d6-eb55-47b6-a087-6399523eee64', 'presas de pollo', 10, '""', '12632281'),
    ('50642a5f-c2a0-47fd-9195-4aad55e7cebb', 'arroz', 20, '""', '12632281'),
    ('5db4488c-97b0-4bd6-93fb-41d6245b4dc3', 'papa', 30, '""', '14431988'),
    ('734536b1-3374-473b-80b5-fea8f4009bd2', 'arina', 40, '""', '12632281'),
    ('7753ecdb-032f-4f67-b4e0-7f7875ed1baa', 'sal', 50, '""', '7677176');
	
--PEDIDO
INSERT INTO pedido (nro, estado, total, descuento, detalle, fecha, ci_usuario, id_tipoDePago, id_mesa) VALUES
    ('e7f52164-3315-486b-a17c-d83682374955', 'pendiente', 17, 0.00, 'Detail 1', CURRENT_TIMESTAMP, '14431988', '8277df76-b3c3-4673-b36a-92befe26419e', '472a5caf-1798-4b53-8d21-4cbc28ad24d8');
INSERT INTO pedido (nro, estado, total, descuento, detalle, fecha, ci_usuario, id_tipoDePago, id_mesa) VALUES    
	('5dc403e9-b1bd-4f8e-801f-6d329775a2fc', 'pendiente', 44, 0.00, 'Detail 2', CURRENT_TIMESTAMP, '14431988', '8277df76-b3c3-4673-b36a-92befe26419e', 'f05df79a-dbbe-4fd7-83a8-c106fadca3e7');
INSERT INTO pedido (nro, estado, total, descuento, detalle, fecha, ci_usuario, id_tipoDePago, id_mesa) VALUES        
	('ca436e95-89a7-4d3a-82c4-0aa08de2753e', 'cancelado', 30, 0.00, 'Detail 3', CURRENT_TIMESTAMP, '14431988', '674e6ad6-e787-423b-ad54-e910a519bd45', '472a5caf-1798-4b53-8d21-4cbc28ad24d8');
INSERT INTO pedido (nro, estado, total, descuento, detalle, fecha, ci_usuario, id_tipoDePago, id_mesa) VALUES        
	('ea648039-ee98-4cea-940f-8c85875826ab', 'pendiente', 17, 0.00, 'Detail 3', CURRENT_TIMESTAMP, '14431988', '674e6ad6-e787-423b-ad54-e910a519bd45', '1d5d5243-7213-4e69-96ff-2de1968cc709');


--DETALLE PEDIDO
INSERT INTO detallePedido (nro_pedido, id_producto, cantidad, Total) VALUES
    ('e7f52164-3315-486b-a17c-d83682374955', 'b4cb1db4-2a12-4670-9576-9af19abe057c', 1, 5),
    ('e7f52164-3315-486b-a17c-d83682374955', '4cf287d6-5686-4881-bd63-591565d5b8fa', 1, 12);
INSERT INTO detallePedido (nro_pedido, id_producto, cantidad, Total) VALUES
    ('5dc403e9-b1bd-4f8e-801f-6d329775a2fc', 'b4cb1db4-2a12-4670-9576-9af19abe057c', 4, 20),
    ('5dc403e9-b1bd-4f8e-801f-6d329775a2fc', 'b6aa8762-b66c-414a-9c63-6d16cd40cc62', 2, 24);
INSERT INTO detallePedido (nro_pedido, id_producto, cantidad, Total) VALUES
    ('ca436e95-89a7-4d3a-82c4-0aa08de2753e', 'd864d5af-bf6f-4aec-975d-15a0dd4a8657', 2, 30);	
INSERT INTO detallePedido (nro_pedido, id_producto, cantidad, Total) VALUES
    ('ea648039-ee98-4cea-940f-8c85875826ab', 'b4cb1db4-2a12-4670-9576-9af19abe057c', 1, 5),
	('ea648039-ee98-4cea-940f-8c85875826ab', 'fe4a567e-f0c7-4de6-a27d-c0e96928e100', 1, 12);	

SELECT * 
FROM PRODUCTO ;

--NOTA DE SALIDA
INSERT INTO NotaDeSalida (id, descripcion, total, fecha, ci_usuario) VALUES
    ('edd11629-fa1a-4404-8458-4266302e5d84', 'me saque una soda por que tenia sed', 15, '2023-10-04 16:08:22', '14431988');
	
	
--DETALLE DE SALIDA
INSERT INTO detalleSalida (id_salida, id_producto, cantidad, total, descripcion) VALUES
    ('edd11629-fa1a-4404-8458-4266302e5d84', 'd864d5af-bf6f-4aec-975d-15a0dd4a8657', 1, 15.00, '');


--PROCEDIMIENTOS ALMACENADOS 
CREATE FUNCTION actualizar_stock() RETURNS TRIGGER 
AS 
$$
DECLARE 
	stock_actual INTEGER ; 
BEGIN
	SELECT stock INTO stock_actual
	from producto
	where producto.id = NEW.id_producto;

	UPDATE producto SET STOCK = stock_actual - NEW.cantidad 
	WHERE producto.id = NEW.id_producto; 
	RETURN NEW ; 
END 
$$
LANGUAGE plpgsql;


--TRIGGERS
CREATE TRIGGER TRG_updateStock BEFORE INSERT ON detallePedido 
FOR EACH ROW 
EXECUTE PROCEDURE actualizar_stock();

CREATE TRIGGER TRG_updateStock BEFORE INSERT ON detalleSalida 
FOR EACH ROW 
EXECUTE PROCEDURE actualizar_stock();








/*------------------------------------*/
/*----CONSULTAS A LA BASE DE DATOS----*/
/*------------------------------------*/


-- 1.- OBTENER EL PRODUCTO CON MAYOR STOCK
SELECT * 
FROM PRODUCTO
WHERE stock = (SELECT MAX(stock) from PRODUCTO);

-- 2.- MOSTRAR LA CANTIDAD DE PEDIDOS QUE ESTAN PENDIENTE
select count(*)
from pedido
where estado='pendiente'

-- 3.- Mostrar la tabla CATEGORIA ordenada por nombre de forma ascendente
SELECT * FROM CATEGORIA
ORDER BY nombre ASC;

-- 4.- MOSTRAR LAS SUBCATOGORIAS FINALES DE LA TABLA CATEGORIA 
SELECT *
FROM CATEGORIA
WHERE id NOT IN (SELECT id_categoria 
			  FROM CATEGORIA WHERE id_categoria IS NOT NULL);

-- 5.-Encontrar la cantidad de productos en cada categoría
SELECT CATEGORIA.NOMBRE , COUNT(*) AS cantidad_productos
FROM PRODUCTO, CATEGORIA 
WHERE PRODUCTO.id_categoria = CATEGORIA.ID
GROUP BY CATEGORIA.NOMBRE;


-- 6.- MOSTRAR LOS PRODUCTOS QUE FORMAN PARTE DE CADA MENU 
SELECT MENU.ID, MENU.NOMBRE , PRODUCTO.*
FROM MENU, MENUPRODUCTO, PRODUCTO 
WHERE MENU.id = MENUPRODUCTO.ID_MENU AND PRODUCTO.ID = MENUPRODUCTO.id_producto
ORDER BY MENU.NOMBRE;

-- 7.- MOSTRAR LOS PRODUCTOS PEDIDOS DE CADA MESA CON ESTADO PENDIENTE  
Select producto.nombre, producto.precio , mesa.nro , pedido.estado
from producto,detallePedido,pedido,mesa
where producto.id=detallePedido.id_producto and detallePedido.nro_Pedido=pedido.nro and 
pedido.id_Mesa=mesa.id and pedido.estado='pendiente' group by producto.nombre, producto.precio , mesa.nro , pedido.estado
ORDER BY mesa.nro ASC

-- 8.- Mostrar a los usuarios que tienen permiso para ELIMINAR en la base de datos
SELECT usuario.ci, usuario.nombre
FROM usuario, rol, rolPermiso, permiso
WHERE usuario.id_rol=rol.id and rol.id=rolPermiso.id_rol 
and rolPermiso.id_Permiso=permiso.id and permiso.nombre='eliminar'  


-- 9.- Mostrar el nombre y el ci de los usuarios que tienen permiso para ACTUALIZAR en la base de datos
SELECT usuario.ci, usuario.nombre
FROM usuario, rol, rolPermiso, permiso
WHERE usuario.id_rol=rol.id and  rol.id=rolPermiso.id_rol
and  rolPermiso.id_permiso=permiso.id and  permiso.nombre='actualizar'


-- 10.- Mostrar el nombre y el ci de los usuarios que tienen permiso para OBTENER en la base de datos.

SELECT usuario.ci, usuario.nombre
FROM usuario, rol, rolPermiso, permiso
WHERE usuario.id_rol=rol.id and  rol.id=rolPermiso.id_rol 
and rolPermiso.id_permiso=permiso.id and permiso.nombre='obtener'

-- 11.- Mostrar el nombre y el ci de los usuarios que tienen permiso para INSERTAR en la base de datos.

SELECT usuario.ci, usuario.nombre
FROM usuario, rol, rolPermiso, permiso
WHERE usuario.id_rol=rol.id and  rol.id=rolPermiso.id_rol 
and rolPermiso.id_permiso=permiso.id and permiso.nombre='insertar'


-- 12.- mostrar el tipo de pago favorito por los clientes para realizar sus pedidos para en el restaurant
SELECT tipoDePago.nombre, COUNT(pedido.nro) AS num_pedidos
FROM pedido
JOIN tipoDePago ON pedido.id_tipoDePago = tipoDePago.id
GROUP BY tipoDePago.nombre
ORDER BY num_pedidos DESC LIMIT 1;

-- 13.- Encontrar el nombre de las categorías y la cantidad de productos en cada categoría, ordenados por 
--cantidad de productos de forma descendente
SELECT c.nombre, COUNT(p.id) AS cantidad_productos
FROM CATEGORIA c
LEFT JOIN PRODUCTO p ON c.id = p.id_categoria
GROUP BY c.nombre
ORDER BY cantidad_productos DESC;

-- 14.- MOSTRAR LOS PRODUCTOS PEDIDOS DE CADA MESA CON ESTADO TERMINADO  
Select producto.nombre, producto.precio , mesa.nro , pedido.estado
from producto,detallePedido,pedido,mesa
where producto.id=detallePedido.id_producto and detallePedido.nro_Pedido=pedido.nro and 
pedido.id_Mesa=mesa.id and pedido.estado='terminado' group by producto.nombre, producto.precio , mesa.nro , pedido.estado
ORDER BY mesa.nro ASC

-- 15.- MOSTRAR LOS PRODUCTOS PEDIDOS DE CADA MESA CON ESTADO CANCELADO  
Select producto.nombre, producto.precio , mesa.nro , pedido.estado
from producto,detallePedido,pedido,mesa
where producto.id=detallePedido.id_producto and detallePedido.nro_Pedido=pedido.nro and 
pedido.id_Mesa=mesa.id and pedido.estado='cancelado' group by producto.nombre, producto.precio , mesa.nro , pedido.estado
ORDER BY mesa.nro ASC

-- 16.- Encontrar el nombre del producto y la cantidad vendida en cada pedido utilizando JOIN y mostrar solo los productos con una cantidad vendida mayor a 5
SELECT dp.nro_pedido, p.nombre, SUM(dp.cantidad) AS cantidad_vendida
FROM detallePedido dp
JOIN PRODUCTO p ON dp.id_producto = p.id
GROUP BY dp.nro_pedido, p.nombre
ORDER BY dp.nro_pedido, p.nombre

-- 17.- Encontrar el nombre de los usuarios y la cantidad de pedidos realizados por cada usuario,
--ordenados por cantidad de pedidos de forma descendente
SELECT u.nombre, COUNT(p.nro) AS cantidad_pedidos
FROM usuario u
LEFT JOIN pedido p ON u.ci = p.ci_usuario
GROUP BY u.nombre
ORDER BY cantidad_pedidos DESC;

-- 19.- cantidad de personas que pagaron con QR
select count(*)
from pedido, tipoDePago
where    tipoDePago.id=pedido.id_tipoDePago and id_tipoDePago in (select tipoDePago.id
																	from tipoDePago
                                                                    where tipoDePago.nombre='codigo QR')

-- 20.- Mostrar la tabla PRODUCTO con precio mayor a 50 y stock menor a 10
SELECT * FROM PRODUCTO
WHERE precio > 50 AND stock < 10;

-- 21.-Contar la cantidad de registros en la tabla USUARIO
SELECT COUNT(*) 
FROM usuario;


-- 22.- Encontrar el precio máximo de los productos en la tabla PRODUCTO
SELECT MAX(precio) 
FROM PRODUCTO;

-- 23.- Encontrar el día de la semana con la hora de inicio y fin de los MENUS utilizando JOIN y ordenar por día de la semana
SELECT d.dia, md.horaInicio, md.horaFin
FROM dia d
JOIN menuDia md ON d.id = md.id_dia
ORDER BY d.dia;


-- 24.- Encontrar el nombre y el cargo de los usuarios que no tienen el cargo "Administrador"
SELECT u.nombre, r.cargo
FROM usuario u
JOIN ROL r ON u.id_rol = r.id
WHERE r.cargo <> 'Administrador';


-- 25.- Encontrar el nombre y la cantidad de insumos que ha registrado cada usuario y ordenar por cantidad de insumos de forma descendente
SELECT u.nombre, COUNT(*) AS cantidad_insumos
FROM usuario u
JOIN INSUMOS i ON u.ci = i.ci_usuario
GROUP BY u.nombre
ORDER BY cantidad_insumos DESC;


-- 26.- Encontrar la fecha y el total de las Notas de Salida con un total entre 100 y 500
SELECT fecha, total
FROM NotaDeSalida
WHERE total BETWEEN 100 AND 500;


-- 27.- Encontrar el número de mesa y el estado de los pedidos que están en estado 'pendiente' o 'en preparación'
SELECT p.id_mesa, p.estado
FROM pedido p
WHERE p.estado IN ('pendiente');

-- 28.- la mesa con mas silla que tiene 
SELECT * 
FROM mesa
WHERE nroSillas = (SELECT MAX(nroSillas) FROM mesa);
-- 29.- cual fue la prumera fecha de salida que se emitio
 SELECT MIN(fecha) AS primera_fecha_de_salida 
 FROM NotaDeSalida;
-- 30.- el nombre del producto con el precio mas elevado
SELECT nombre
FROM PRODUCTO
WHERE precio = (SELECT MAX(precio) FROM PRODUCTO);






/*   CARLOS 
-- la venta con el total mas elevado
select MAX(Total)
from detallePedido

-- Cantidad de usuarios masculinos
select count(*) 
from usuario
where sexo='M'
-- nombre de la persona mas su contraseña y correo
select usuario.nombre, usuario.correo, usuario.contraseña
from usuario    
-- precio que tiene dicho producto por ejemplo la 'coca cola 2lts'
SELECT producto.nombre, producto precio
from PRODUCTO
where producto.nombre='coca cola 2lts'
-- la mesa con mas silla que tiene 
SELECT * 
FROM mesa
WHERE nroSillas = (SELECT MAX(nroSillas) FROM mesa);
-- cual fue la prumera fecha de salida que se emitio
 SELECT MIN(fecha) AS primera_fecha_de_salida 
 FROM NotaDeSalida;
-- el nombre del producto con el precio mas elevado
SELECT nombre
FROM PRODUCTO
WHERE precio = (SELECT MAX(precio) FROM PRODUCTO);


*/