import { Schema } from "mongoose";
import { Counter } from "@/models/counter.model";

interface AutoIncrementOptions {
    field: string;      // اسم الحقل، مثلا "jobId"
    prefix?: string;    // مثلا "JOB"
    padding?: number;   // عدد الأصفار، مثلا 5 => 00001
}

export function autoIncrementPlugin(schema: Schema, options: AutoIncrementOptions) {
    const {field,prefix = "", padding=0} = options
    schema.pre("validate", async function () {
        if (!this.get(field)) {
            const counterKey = `${schema.get("collection") || "default"}_${field}`;
            const counter = await Counter.findByIdAndUpdate(
                counterKey,
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            const value = String(counter.seq).padStart(padding, "0");
            this.set(field, prefix ? `${prefix}-${value}` : value);
        }
    })
}