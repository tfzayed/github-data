import { Schema, model, models } from "mongoose";

interface IRepository {
    name: string;
    org: string;
    image: string;
    forks: { date: string; forks: number }[];
    stars: { date: string; stars: number }[];
    issues: string;
    pr: string;
    commit: string;
    create: string;
}

const repositorySchema = new Schema<IRepository>({
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
    models.Repository || model<IRepository>("Repository", repositorySchema);

export default RepositoryModel;
