import { Schema, model, models } from "mongoose";

interface IRepo {
    name: string;
    forks: number;
    stars: number;
    commit: string;
    create: string;
}

const repoSchema = new Schema<IRepo>({
    name: { type: String, required: true },
    forks: { type: Number, required: true },
    stars: { type: Number, required: true },
    commit: { type: String, required: true },
    create: { type: String, required: true },
});

const RepoModel = models.Repo || model<IRepo>("Repo", repoSchema);

export default RepoModel;
