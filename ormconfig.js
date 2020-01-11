module.exports = {

    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4_unicode_ci",

    entities: [
        "build/db/entities/**/*.js"
    ],
    migrations: [
        "build/db/migrations/**/*.js"
    ],
    cli: {
        "entitiesDir": "build/db/entities",
        "migrationsDir": "build/db/migrations",
    }

};

