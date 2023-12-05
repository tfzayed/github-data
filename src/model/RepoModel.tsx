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
    name: { type: String, required: true },
    org: { type: String, required: true },
    image: { type: String, required: true },
    forks: [
        {
            date: { type: String, required: true },
            forks: { type: Number, required: true },
        },
    ],
    stars: [
        {
            date: { type: String, required: true },
            stars: { type: Number, required: true },
        },
    ],
    issues: { type: String, required: true },
    pr: { type: String, required: true },
    commit: { type: String, required: true },
    create: { type: String, required: true },
});

const RepositoryModel =
    models.Repository || model<IRepository>("Repository", repositorySchema);

export default RepositoryModel;
