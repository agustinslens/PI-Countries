const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
let id = 1;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    fifa:{
      type: DataTypes.STRING(3),
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRegion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    poblacion: {
      type: DataTypes.INTEGER,
    },
  },{
    timestamps: false 
  });
};
