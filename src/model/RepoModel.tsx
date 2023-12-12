import { Repository } from "@/types";
import { Schema, model, models } from "mongoose";

const repositorySchema = new Schema<Repository>({
    name: { type: String },
    org: { type: String },
    image: { type: String },
    forks: [
        {
            date: { type: String },
            forks: { type: Number },
        },
    ],
    stars: [
        {
            date: { type: String },
            stars: { type: Number },
        },
    ],
    issues: { type: String },
    pr: { type: String },
    commit: { type: String },
    create: { type: String },
});

const RepositoryModel =
    models.Repository || model<Repository>("Repository", repositorySchema);

export default RepositoryModel;
