const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                max:5,
                min:1
            }
        },
        duration: {
            type: DataTypes.TIME(0),
            defaultValue: "00:00:00"
        },
        season: {
            type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera","Durante todas las estaciones del año"),
            allowNull:false,
        },
    })
}