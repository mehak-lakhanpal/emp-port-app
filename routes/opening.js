const express = require('express');
const router = express.Router();
const openingController = require('../controllers/opening');
const auth = require('../middlewares/auth');

/* Register new opening */
router.post('/create',
  [auth.isAuthorized('manager'),
  openingController.validate('createOpening')],
  openingController.createOpening,
);

router.get('/create', auth.isAuthorized('manager'),function (req, res, next) {
  res.render('./../views/opening/create', {
      opening: {},
      errors:{}
  })
});

router.get('/',
  auth.isAuthorized('manager','employee'),
  openingController.getAllOpening
);

router.get('/:id',
  auth.isAuthorized('employee'),
  openingController.getOpeningById
);

router.get('/update/:id',
  auth.isAuthorized('manager'),
  openingController.findOpeningForUpdate
);

router.put('/update',
  auth.isAuthorized('manager'),
  openingController.validate('createOpening'),
  openingController.updateOpening,
);

router.get('/apply/:openingId',
  auth.isAuthorized('employee'),
  openingController.applyForOpening,
);

module.exports = router;