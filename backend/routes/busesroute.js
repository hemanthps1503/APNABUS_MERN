const router = require('express').Router();
const authmiddleware = require('../middlewares/authmiddleware');
const Bus = require('../models/busmodel');

//add bus

router.post('/add-bus', authmiddleware, async (req, res) => {
  try {
    const existingbus = await Bus.findOne({ number: req.body.number });
    if (existingbus) {
      return res.status(200).send({
        success: false,
        message: 'Bus already exists',
      });
    }
    const newbus = new Bus(req.body);
    await newbus.save();
    return res.status(200).send({
      success: true,
      message: 'Books added successfully',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//update-bus

router.post('/update-bus', authmiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: 'Books updated successfully',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//delete bus

router.post('/delete-bus', authmiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: 'Books deleted successfully',
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//get all buses

router.post('/get-all-buses', authmiddleware, async (req, res) => {
  try {
    const buses = await Bus.find();
    return res.status(200).send({
      success: true,
      message: 'Books fetched successfully',
      data: buses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//get-bus-by-id

router.post('/get-bus-by-id', authmiddleware, async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: 'books fetched successfully',
      data: bus,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});
module.exports = router;
