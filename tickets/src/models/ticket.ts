import mongoose from "mongoose"

interface TicketAttrs {
  title: string
  price: number
  userId: string
}

/**
 * @description TicketDoc interface'ini kullanarak TicketModel interface'ini oluşturuyoruz
 * Doğru bir şekilde kullanıldığında TicketModel interface'indeki özelliklerin hepsi TicketDoc interface'inde de olmalı
 */
interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  userId: string
}

/**
 * @description Mongoose üzerinden build methodunu kullanabilmek için TicketModel interface'ini oluşturuyoruz
 */
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    /**
     * @description toJSON: geriye dönerken istemediğimiz özellikleri silmek için kullanılır
     */
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema)

export { Ticket }
