import Booking from '../models/Booking.js'

export const BookingEvent = async (req, res, next) => {
  const datas = req.body
  console.log(':::::::::::}}', datas)
  const newEvent = new Booking(req.body)
  try {
    const savedEvent = await newEvent.save()
    console.log('??????????????????????', savedEvent)
    res.status(200).json(savedEvent)
  } catch (err) {
    next(err)
  }
}
