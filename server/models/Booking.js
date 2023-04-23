import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    currentEvent: [{ allDay: Boolean, title: String, Start: String }],
    // rooms: {
    //   type: [String],
    // },
    // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
  },
  { timestamps: true }
)

export default mongoose.model('Booking', BookingSchema)
