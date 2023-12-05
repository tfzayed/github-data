import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";

async function getRepo() {
    const res = await fetch("http://localhost:3000/api/get", {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function GetRepo() {
    const data = await getRepo();
    const repositories = data.repositoryInfo;

    if (repositories.length === 0) {
        return (
            <div className="row g-5 mb-16">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    return (
        <>
            <div className="row g-5 mb-16">
                {repositories &&
                    repositories.map((repository: any, i: number) => (
                        <div key={i} className="col-4">
                            <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-w-full min-h-full">
                                <div className="">
                                    <div>
                                        {repository.image !== null && (
                                            <Image
                                                src={repository.image}
                                                className="mb-2 mx-auto"
                                                width={300}
                                                height={255}
                                                alt="repo img"
                                                placeholder="blur"
                                                blurDataURL="/images/placeholder.png"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <div className="my-6">
                                            <h1 className="mb-2 font-bold text-xl">
                                                {repository.name}
                                            </h1>
                                            <h2 className="mb-4 font-bold text-xl">
                                                <span className="font-normal">
                                                    Org: {repository.org}
                                                </span>
                                            </h2>
                                            <div className="flex">
                                                <p className="mb-2 font-bold">
                                                    Forks:{" "}
                                                    <span className="font-normal">
                                                        {
                                                            repository?.forks.slice(
                                                                -1
                                                            )[0].forks
                                                        }
                                                    </span>
                                                </p>
                                                <p className="mx-5">-</p>
                                                <p className="mb-2 font-bold">
                                                    Stars:{" "}
                                                    <span className="font-normal">
                                                        {
                                                            repository?.stars.slice(
                                                                -1
                                                            )[0].stars
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex">
                                                <p className="mb-4 font-bold">
                                                    Issues:{" "}
                                                    <span className="font-normal">
                                                        {repository?.issues}
                                                    </span>{" "}
                                                </p>
                                                <p className="mx-5">-</p>
                                                <p className="mb-4 font-bold">
                                                    PR:{" "}
                                                    <span className="font-normal">
                                                        {repository?.pr}
                                                    </span>
                                                </p>
                                            </div>

                                            <p className="mb-2 font-bold">
                                                Last Commit:{" "}
                                                <span className="font-normal">
                                                    {repository?.commit}
                                                </span>
                                            </p>
                                            <p className="mb-2 font-bold">
                                                Created Data:{" "}
                                                <span className="font-normal">
                                                    {repository?.create}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <div className="row justify-center">
                                                <div className="col-6">
                                                    {repository.name && (
                                                        <Link
                                                            href={`https://github.com/${repository.org}/${repository.name}/blob/master/README.md`}
                                                            target="_blank"
                                                            className="bg-[#536271] rounded-lg text-center py-3 block"
                                                        >
                                                            Readme
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    {repository.name && (
                                                        <Link
                                                            href={`https://github.com/${repository.org}/${repository.name}`}
                                                            target="_blank"
                                                            className="bg-[#536271] rounded-lg text-center py-3 block"
                                                        >
                                                            Github
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
