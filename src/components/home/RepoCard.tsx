import { Repository } from "@/types";
import { format, formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function RepoCard({ repository }: { repository: Repository }) {
    return (
        <div className="col-10 md:col-6 lg:col-4">
            <div className="shadow-lg p-5 mx-auto rounded-lg min-h-full">
                {repository.image !== null && (
                    <div className="h-fit">
                        <Image
                            src={repository.image}
                            className="mb-2 mx-auto"
                            width={355}
                            height={255}
                            alt="repo img"
                            placeholder="blur"
                            blurDataURL="/images/placeholder.png"
                        />
                    </div>
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
                            {repository?.forks && (
                                <span className="font-normal">
                                    {
                                        repository?.forks[
                                            repository?.forks.length - 1
                                        ].forks
                                    }
                                </span>
                            )}
                        </p>
                        <p className="mx-5">-</p>
                        <p className="mb-2 font-bold">
                            Stars:{" "}
                            <span className="font-normal">
                                {
                                    repository?.stars[
                                        repository?.stars.length - 1
                                    ].stars
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
                            {formatDistance(
                                new Date(repository?.commit),
                                new Date(),
                                { addSuffix: true }
                            )}
                        </span>
                    </p>
                    <p className="mb-2 font-bold">
                        Release Data:{" "}
                        <span className="font-normal">
                            {format(new Date(repository?.create), "dd-MM-yyyy")}
                        </span>
                    </p>
                </div>

                <div className="row">
                    <div className="col-12 md:col-4 mb-2 lg:mb-0">
                        {repository.name && (
                            <Link
                                href={`https://github.com/${repository.org}/${repository.name}#readme`}
                                target="_blank"
                                className="text-white bg-[#505f75] rounded-lg text-center block py-3"
                            >
                                Readme
                            </Link>
                        )}
                    </div>
                    <div className="col-12 md:col-4 mb-2 lg:mb-0">
                        {repository.name && (
                            <Link
                                href={`https://github.com/${repository.org}/${repository.name}`}
                                target="_blank"
                                className="text-white bg-[#505f75] rounded-lg text-center block py-3"
                            >
                                Github
                            </Link>
                        )}
                    </div>
                    <div className="col-12 md:col-4 mb-2 lg:mb-0">
                        {repository._id && (
                            <Link
                                href={`${repository._id}`}
                                className="text-white bg-[#505f75] rounded-lg text-center block py-3"
                            >
                                Details
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
