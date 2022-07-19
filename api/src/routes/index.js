const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryMiddleware = require('./middelware/routecountry.js')
const activityMiddleware = require('./middelware/routeactivity.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryMiddleware);
router.use('/activities',activityMiddleware);

module.exports = router;
