import mongoose, { Types } from "mongoose";
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;

const PurchasesHistoric = new Schema({
	transcationID: { type: String, default: randomUUID},
	value: { type: Number },
	createdAt: { type: Date, default: new Date() },
});

const WalletSchema = new Schema({
	walletID: { type: String, default: randomUUID },
	ownerID: { type: Types.ObjectId, required: true, ref: "users" },
	purchasesHistoric: { type: [PurchasesHistoric] },
	value: { type: Number, default: 0, required: true },
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: new Date() },
});


export default mongoose.model("wallet", WalletSchema);