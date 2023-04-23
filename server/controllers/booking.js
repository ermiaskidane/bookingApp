import Booking from '../models/Booking.js'

export const BookingEvent = async (req, res, next) => {
  console.log('@@@@@@@@', req.body)
  const newEvent = new Booking(req.body)
  try {
    const savedEvent = await newEvent.save()
    res.status(200).json(savedEvent)
  } catch (err) {
    next(err)
  }
}
