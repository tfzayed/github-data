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
            id: repo._id,
            name: repo.name,
            org: repo.org,
            image: repo.image,
            forks: [
                {
                    date: new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }),
                    forks: getRepositoryInfo.forks,
                },
            ],
            stars: [
                {
                    date: new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }),
                    stars: getRepositoryInfo.stargazers_count,
                },
            ],
            issues: getRepositoryInfo.open_issues_count,
            pr: prData.length,
            commit: new Date(getRepositoryInfo.pushed_at).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }
            ),
            create: new Date(getRepositoryInfo.created_at).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }
            ),
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

    const bulkOps = updatedRepositoryData.map((data: any) => {
        const repository = repositoryInfo.find(
            (repo: any) => repo._id === data.id
        );

        const $push: Record<string, any> = {};
        const $set: Record<string, any> = {
            org: data.org,
            pr: data.pr,
            issues: data.issues,
            image: data.image,
            commit: data.commit,
            create: data.create,
        };

        // checking forks
        const forksMatch =
            repository?.forks &&
            data?.forks &&
            repository.forks[repository.forks.length - 1]?.date ===
                data.forks[0]?.date;
        if (forksMatch) {
            $set[`forks.${repository?.forks.length - 1}.forks`] =
                data.forks[0].forks;
        } else {
            $push.forks = data.forks;
        }

        // checking stars
        const starsMatch =
            repository?.stars &&
            data?.stars &&
            repository.stars[repository.stars.length - 1]?.date ===
                data.stars[0]?.date;
        if (starsMatch) {
            $set[`stars.${repository?.stars.length - 1}.stars`] =
                data.stars[0].stars;
        } else {
            $push.stars = data.stars;
        }

        return {
            updateOne: {
                filter: { name: data.name },
                update: {
                    $push,
                    $set,
                },
                upsert: true,
            },
        };
    });

    try {
        const result = await RepositoryModel.bulkWrite(bulkOps);
    } catch (error: any) {
        console.error(`Error performing bulk write: ${error.message}`);
    }

    return updatedRepositoryData;
};
