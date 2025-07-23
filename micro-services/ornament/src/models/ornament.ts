import mongoose, { Schema } from "mongoose";
import { Material } from "../types";

interface OrnamentAttrs {
  name: string;
  weight: number;
  material: string;
}

interface OrnamentDoc extends mongoose.Document {
  name: string;
  weight: number;
  material: string;
}

interface OrnamentModel extends mongoose.Model<OrnamentDoc> {
  build(attrs: OrnamentAttrs): OrnamentDoc;
}

const ornamentSchema = new Schema<OrnamentDoc>({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  material: { type: String, enum: Object.values(Material), required: true },
});

ornamentSchema.statics.build = (attrs: OrnamentAttrs) => {
  return new Ornament(attrs);
};

const Ornament = mongoose.model<OrnamentDoc, OrnamentModel>(
  "Ornament",
  ornamentSchema
);

export default Ornament;
