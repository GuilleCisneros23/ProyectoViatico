##Proyecto Viático##


##Requisitos##


Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas y herramientas esenciales:

- MariaDB: Este sistema de gestión de bases de datos se utiliza para almacenar y gestionar los datos del proyecto. 
           Asegúrate de tenerlo correctamente configurado en tu máquina.

- Node.js y Angular: Son necesarios para el manejo del frontend. Primero, instala Node.js descargando el instalador 
                     desde su página oficial y sigue las instrucciones para tu sistema operativo.Una vez instalado Node.js,
                     abre una terminal y ejecuta el siguiente comando para instalar Angular CLI globalmente:
       
                     "npm install -g @angular/cli"

                     Esto te permitira la creación ye ejecución de proyecto angular desde la terminal.

- Java:  Es necesario para manejar el backend. Se recomienda instalar JDK 21, ya que fue la versión utilizada para configurar el 
         proyecto. Puedes instalar el JDK desde el sitio oficial.

- Maven: Es la herramienta de gestión de proyectos y construcción utilizada en el backend de este proyecto.Asegúrate de que Maven 
         esté correctamente configurado en el sistema para poder ejecutar comandos como "mvn clean install" o "mvn spring-boot:run".


  Si utilizas Visual Studio Code (VSCode) como editor de código, asegúrate de instalar las siguientes extensiones:

  - Extension Pack for Java
  - Spring Boot Tools

Con las anteriores herramientas, ya se puede seguir para hacer correr el proyecto de viáticos.


##Instrucciones##


-----Paso 1: Preparación de la base de datos (MariaDB)-----


1. Instala MariaDB en tu máquina si no lo tienes ya instalado.
2. Abre una terminal o consola y accede con mysql -u root -p
3. Utiliza las creedenciales de acceso para tu usario root, si es la primera vez configura la contraseña "Ragnarok23",
   esto ya que en la configuración del proyecto esta definida esta clave.
4. Una vez dentro de mariaDB, ejecuta el siguiente comando para crear la base de datos `viaticos_db`
    ```CREATE DATABASE viaticos_db;```

Es necesario usar "viaticos_db" debido a las configuraciones dentro del application properties.


-----Paso 2: Configuración de la aplicación Spring Boot-----


Dentro de la carpeta del proyecto Spring Boot (proyectov1), ya está configurada la creación automática de la tabla "viáticos" 
gracias a la configuración de la entidad `Viático` y la propiedad `spring.jpa.hibernate.ddl-auto=update` en "application properties".
Esto significa que cuando ejecutes el proyecto, Spring Boot se encargará de crear las tablas necesarias en la base de datos 
"viaticos_db".

Hay que asegurarse que el archivo "application.properties" del proyectov1 esté configurado de esta manera:


spring.datasource.url=jdbc:mariadb://localhost:3306/viaticos_db
spring.datasource.username=root
spring.datasource.password=Ragnarok23
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true


Si el valor del URL, usuario o clave es distinta en su configuración personal, actualiza estos valores en el archivo, si todo está 
bien ya se puede correr el proyecto.  


-----Paso 3: Correr el proyecto-----


Para evitar la necesidad de tener que ejecutar el backend y el frontend en dos terminales diferentes, se configuró el archivo package.json 
en el proyecto del frontend con concurrently. Esta herramienta permite ejecutar múltiples comandos en paralelo desde una sola terminal.

Solo es necesario ir a la carpeta "frontend" dentro del proyectov1. La ruta hacia esa carpeta es similar a proyectov1/frontend 
dentro de la terminal, ejecutamos "npm start" lo que provocará que concurrentemente se utilice "mvn spring-boot:run" por 
parte del back y "ng serve" por parte del frontend. Una vez que corra el programa vamos al puerto 4200 de nuestro localhost, 
similar a http://localhost:4200/ y podremos usar la aplicación web sin problema. El back-end se abrirá en el puerto 8080 y por aquí se harán
todas las solicitudes API.
