import { Repository } from "@/types";
import { titleify } from "@/utils/textConverter";
import { format, formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Fork from "../svg/Fork";
import Issue from "../svg/Issue";
import Pen from "../svg/Pen";
import Pull from "../svg/Pull";
import Star from "../svg/Star";

export default function RepoCard({ repository }: { repository: Repository }) {
    return (
        <div className="col-10 md:col-6 lg:col-4">
            <div className="shadow-lg p-5 mx-auto rounded-lg min-h-full flex flex-col justify-between">
                {repository.image !== null && (
                    <Image
                        src={repository.image}
                        className="mb-2 mx-auto shadow-xl"
                        width={355}
                        height={255}
                        alt="repository img"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                    />
                )}

                <div className="my-6">
                    <div className="flex items-center">
                        <h1 className="font-bold text-xl mr-2">
                            {titleify(repository.name)}
                        </h1>
                        {repository._id && (
                            <Link
                                href={`update/${repository._id}`}
                                className="font-bold text-2xl"
                            >
                                <Pen />
                            </Link>
                        )}
                    </div>

                    <p className="mb-4 font-bold text">
                        <span className="font-normal">{repository.org}</span>
                    </p>

                    {/* info */}
                    <div className="flex">
                        <p className="mb-2 font-bold flex items-center">
                            <Star /> <span className="ml-2 mr-3">Stars: </span>
                            <span className="font-normal">
                                {
                                    repository?.stars[
                                        repository?.stars.length - 1
                                    ].stars
                                }
                            </span>
                        </p>
                        <p className="mx-5">-</p>
                        <p className="mb-2 font-bold flex items-center">
                            <Fork /> <span className="ml-2 mr-3">Forks: </span>
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
                    </div>
                    <div className="flex">
                        <p className="mb-4 font-bold flex items-center">
                            <Issue />{" "}
                            <span className="ml-2 mr-3">Issues: </span>
                            <span className="font-normal">
                                {repository?.issues}
                            </span>{" "}
                        </p>
                        <p className="mx-5">-</p>
                        <p className="mb-4 font-bold flex items-center">
                            <Pull /> <span className="ml-2 mr-3">PR: </span>
                            <span className="font-normal">
                                {repository?.pr}
                            </span>
                        </p>
                    </div>

                    <p className="mb-2 font-bold">
                        Last Commit:{" "}
                        <span className="font-normal">
                            {repository?.commit &&
                                formatDistance(
                                    new Date(repository?.commit),
                                    new Date(),
                                    { addSuffix: true }
                                )}
                        </span>
                    </p>
                    <p className="mb-2 font-bold">
                        Release Data:{" "}
                        <span className="font-normal">
                            {repository?.create &&
                                 format(new Date(repository?.create), "do MMMM, yyyy")}
                        </span>
                    </p>
                </div>

                <div className="row g-1">
                    <div className="col-12 lg:col-6">
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
                    <div className="col-12 lg:col-6">
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
