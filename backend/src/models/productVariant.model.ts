import mongoose, { Document, Model, Schema } from "mongoose";

// Product variant interface
export interface IProductVariant extends Document {
  name: string;
  attribute: string;
  variants: string[];
  products: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Product variant schema
const productVariantSchema = new Schema<IProductVariant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    attribute: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    variants: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const ProductVariant: Model<IProductVariant> =
  mongoose.model<IProductVariant>("ProductVariant", productVariantSchema);
