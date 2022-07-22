




module.exports ={
 mejor:function (arr) {
    let array = ['And', 'Y', 'Of', 'Del', 'De'];
    let minCountry = arr.toLowerCase();
    let countryName = minCountry.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
    let namespliteado = countryName.split(' ');
    let n = array.find(e => namespliteado.includes(e))
    if (n) {
        let indice = namespliteado.indexOf(n)
        namespliteado[indice] = namespliteado[indice].toLowerCase()
    }
    let finishname = namespliteado.join(' ')
    return finishname;
}}
