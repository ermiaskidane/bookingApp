import express from 'express'
import { BookingEvent, GetBookingEvent } from '../controllers/booking.js'

const router = express.Router()

//GOOGLE AUTH
router.post('/event', BookingEvent)
router.get('/event', GetBookingEvent)

export default router
