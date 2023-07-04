import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('node-course', 'root', '1234ABCD', {
    dialect: 'mysql',
    host: 'localhost'
})
 