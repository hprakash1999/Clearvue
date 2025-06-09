import mongoose, { Document, Model, Schema } from "mongoose";

// Flash sale interface
export interface IFlashSale extends Document {
  products: mongoose.Types.ObjectId[];
  flashDiscount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Flash sale schema
const flashSaleSchema = new Schema<IFlashSale>(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    flashDiscount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const FlashSale: Model<IFlashSale> = mongoose.model<IFlashSale>(
  "FlashSale",
  flashSaleSchema
);
