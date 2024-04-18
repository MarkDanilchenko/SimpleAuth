## Description

This is a test project 'NODEJS_SimpleAuth' using:

- MongoDB;
- Mongoose;
- ExpressJS;
- Docker + Compose;
- JWT (accessToken).

## Launch instructions

1. Clone repository/archive to your **local folder**;
2. Open Terminal and make sure You are in **local folder**:

```
cd '.../local_folder'
```

3. Copy file dev.env and rename to .env in the same root directory:

```
cp dev.env .env
```

4. (optional) Open and follow the instructions in the new created .env file if you want *to specify app-host and outer-port for docker containers*;

5. For this step you should already have installed Docker and Compose on your PC. Start installation:

```
docker-compose up --build -d
```

- Installation can take some time, it depends on your PC resources;
- Installation is completed when Terminal is ready for the next input. Restore default data:

```
docker exec -it <DB_HOST from .env> mongorestore --db nodejs_simpleauth --drop ./dump
```

- After that, the client-server will start automatically on

    <SERVER_HOST from .env>:<SERVER_PORT_OUTER from .env>;
- Open app in your browser with URL;

    <http://<SERVER_HOST from .env>:<SERVER_PORT_OUTER from .env>/>

6. **Test page endpoint** (you should be able to see simple greeting text):

- **url.../hello**

7. API provide 3 endpoints except test one:

- **url.../api/v1/sign_up**
  - *user registration* with username and password (user-role: user);
- **url.../api/v1/sign_in**
  - *user authentication* with username and password and jwt-access in response;
- **url.../api/v1/profile**
  - get *whole information about all users* in the database (for admin-role only). Should use JWT in request body;

8. The default users has been already created;

- You can login under current admin using credentials:

```
username: admin

password: admin12345
```

- You can login under default user using credentials:

```
username: user

password: user12345
```

9. To **stop** the app (**server**):

```
Ctrl + C
```

10. To **stop** the app (**stop** all docker **containers**):

```
docker compose stop
```

11. To **start** the app (**start** all docker **containers**):

```
docker compose start
```

12. To completely **remove** all created docker **containers, images and volumes**:

```
docker compose down --volumes --rmi all
```
