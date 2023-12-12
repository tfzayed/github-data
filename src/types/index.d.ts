export type Repository = {
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
