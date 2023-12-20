export type Repository = {
    _id: string;
    id: string;
    name: string;
    org: string;
    image: string;
    forks: { date: string; forks: number }[];
    stars: { date: string; stars: number }[];
    issues: string;
    pr: string;
    commit: string;
    create: string;
};

export type RepositoryInfo = {
    id?: string;
    name: string;
    org: string;
    image: string;
};
