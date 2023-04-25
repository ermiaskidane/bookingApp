import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    allDay: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
    },
    // currentEvent: {
    //   type: [String],
    // },
    // currentEvents: [
    //   { allDay: Boolean, title: String, start: String, id: String },
    // ],
    // rooms: {
    //   type: [String],
    // },
    // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
  },
  { timestamps: true }
)

export default mongoose.model('Booking', BookingSchema)
