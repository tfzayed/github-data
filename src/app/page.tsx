import Image from "next/image";
import Link from "next/link";

async function getData() {
    const timestamp = Date.now();
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get?timestamp=${timestamp}`;

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function page() {
    const data = await getData();

    return (
        <main className="pb-24">
            <h1 className="text-center font-bold text-5xl mb-10">
                Repositories
            </h1>
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="container">
                    <div className="row g-5">
                        {data.repositoryInfo
                            .slice(-3)
                            .map((repository: any, i: number) => (
                                <div key={i} className="col-4">
                                    <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-h-full">
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

                                        <div className="">
                                            <div className="row">
                                                <div className="col">
                                                    {repository.name && (
                                                        <Link
                                                            href={`https://github.com/${repository.org}/${repository.name}/blob/master/README.md`}
                                                            target="_blank"
                                                            className="bg-[#536271] rounded-lg text-center block py-3 "
                                                        >
                                                            Readme
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="col">
                                                    {repository.name && (
                                                        <Link
                                                            href={`https://github.com/${repository.org}/${repository.name}`}
                                                            target="_blank"
                                                            className="bg-[#536271] rounded-lg text-center block py-3 "
                                                        >
                                                            Github
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
