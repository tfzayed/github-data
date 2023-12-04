import { Schema, model, models } from "mongoose";

interface IRepositoryInfo {
    name: string;
    org: string;
    image: string;
}

const repositoryInfoSchema = new Schema<IRepositoryInfo>({
    name: { type: String, required: true },
    org: { type: String, required: true },
    image: { type: String, required: true },
});

const RepositoryInfoModel =
    models.RepositoryInfo ||
    model<IRepositoryInfo>("RepositoryInfo", repositoryInfoSchema);

export default RepositoryInfoModel;
