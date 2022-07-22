const { Op, Country, Activity, country_activity } = require('../../db');
/* const { mejor } = require('./functhelper'); */
 function  mejor(e){
    let array = ['And', 'Y', 'Of', 'Del', 'De'];
    let minCountry = e.toLowerCase();
    let countryName = minCountry.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
    let namespliteado = countryName.split(' ');
    let n = array.find(e => namespliteado.includes(e))

    if (n) {
        let indice = namespliteado.indexOf(n)
        namespliteado[indice] = namespliteado[indice].toLowerCase()
    }
    let finishname = namespliteado.join(' ')
    return finishname;
}
module.exports = {
    listCountries: async function (data) {
        if (data) {
            let id = 1;
            let obj = {}
            let filtrado = data.map(e => {

                obj = {
                    fifa: e.fifa ? e.fifa : `${id++}`,
                    name: e.name ? e.name.common : 'no tiene nombre',
                    flags: e.flags ? e.flags[1] : e.flags[0] ? e.flags[0] : 'no tiene bandera',
                    continents: e.continents ? e.continents[0] : 'no tiene continente',
                    capital: e.capital ? e.capital[0] : 'no existe capital',
                    subRegion: e.subregion,
                    area: e.area,
                    poblacion: e.population
                }
                return obj;
            })
            await Country.bulkCreate(filtrado);
            return filtrado;
        } else {
            let allcountries = await Country.findAll();
            return allcountries;
        }
    },
    countryDetail: async function (id) {
        let country = await Country.findByPk(id,
            {
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: { attributes: [] }
                }]
            })
        if (!country) {
            throw 'el id solicitado no existe';
        } else {
            return country;
        }
    },
    countryDetailByName: async function (a) {
        let array = ['And', 'Y', 'Of', 'Del', 'De'];
        const min = a.toLowerCase()
        const name = min.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
        let namespliteado = name.split(' ');
        let n = array.find(e => namespliteado.includes(e))
        if (n) {
            let indice = namespliteado.indexOf(n)
            namespliteado[indice] = namespliteado[indice].toLowerCase()
        }
        let finishname = namespliteado.join(' ')
        let country = await Country.findAll({
            where: {
                name: finishname
            },
            include: [{
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: { attributes: [] }
            }],
        })
        if (country.length === 0) {
            throw 'el nombre no matchea con ningun pais';
        } else {
            return country;
        }
    },
    createActivity: async function (obj) {
        if (!obj.name || !obj.countryName.length) {
            throw 'Falta enviar datos obligatorios';
        } else {
            let finishname = obj.countryName.map( (e) => mejor(e) )
           
            let minActivity = obj.name.toLowerCase();
            let activityName = minActivity.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
            
            
            let existeAct = await Activity.findOne({
                where:{
                    name: activityName
                }
            })
            if(existeAct){
                
                let paises =await Country.findAll({
                    where: {
                        name: finishname
                    }
                })
                
              let actpais=  await existeAct.addCountries(paises);
              return actpais;
            }else{
                let data = {
                    name: activityName,
                    difficulty: obj.difficulty,
                    duration: obj.duration,
                    season: obj.season
                }

                let paises =await Country.findAll({
                    where: {
                        name: finishname
                    }
                })
                
                const newActivity = await Activity.create(data);
                await newActivity.addCountries(paises);

                return newActivity;
            }
        }
    }
}
