"use server";

import RepositoryModel from "@/model/RepoModel";

export const fetchRepositoryData = async (repo: any) => {
    try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const [res, prRes] = await Promise.all([
            fetch(`https://api.github.com/repos/${repo.org}/${repo.name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            fetch(
                `https://api.github.com/repos/${repo.org}/${repo.name}/pulls`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        ]);

        const getRepositoryInfo = await res.json();
        const prData = await prRes.json();

        return {
            name: repo.name,
            org: repo.org,
            image: repo.image,
            forks: [
                {
                    date: new Date().toLocaleString("en-BD"),
                    forks: getRepositoryInfo.forks,
                },
            ],
            stars: [
                {
                    date: new Date().toLocaleString("en-BD"),
                    stars: getRepositoryInfo.stargazers_count,
                },
            ],
            issues: getRepositoryInfo.open_issues_count,
            pr: prData.length,
            commit: getRepositoryInfo.pushed_at,
            create: getRepositoryInfo.created_at,
        };
    } catch (error: any) {
        console.error(`Error fetching data for ${repo.name}: ${error.message}`);
        return null;
    }
};

export const updateRepositoryData = async (repositoryInfo: any) => {
    const updatedRepositoryData = await Promise.all(
        repositoryInfo.map(fetchRepositoryData)
    );

    const bulkOps = updatedRepositoryData.map((data: any) => ({
        updateOne: {
            filter: { name: data.name },
            update: {
                $push: {
                    forks: data.forks,
                    stars: data.stars,
                },
                $setOnInsert: {
                    org: data.org,
                    pr: data.pr,
                    issues: data.issues,
                    image: data.image,
                    commit: data.commit,
                    create: data.create,
                },
            },
            upsert: true,
        },
    }));

    try {
        const result = await RepositoryModel.bulkWrite(bulkOps);
    } catch (error: any) {
        console.error(`Error performing bulk write: ${error.message}`);
    }

    return updatedRepositoryData;
};
