import { Schema, model, models } from "mongoose";

interface IRepository {
    name: string;
    org: string;
    forks: number;
    stars: number;
    commit: string;
    create: string;
}

const repositorySchema = new Schema<IRepository>({
    name: { type: String, required: true },
    org: { type: String, required: true },
    forks: { type: Number, required: true },
    stars: { type: Number, required: true },
    commit: { type: String, required: true },
    create: { type: String, required: true },
});

const RepositoryModel = models.Repository || model<IRepository>("Repository", repositorySchema);

export default RepositoryModel;
