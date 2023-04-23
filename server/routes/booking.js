import express from 'express'
import { BookingEvent } from '../controllers/booking.js'

const router = express.Router()

//GOOGLE AUTH
router.post('/event', BookingEvent)

export default router
