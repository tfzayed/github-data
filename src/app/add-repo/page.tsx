"use client";

import { useRouter } from "next/navigation";

export default function AddRepo() {
    const { push } = useRouter();
    let repositoryInfo: { name: any; org: any; image: any };

    const onSubmit = (e: any) => {
        e.preventDefault();

        repositoryInfo = {
            name: e.target.name.value,
            org: e.target.org.value,
            image: e.target.img.value,
        };

        if (repositoryInfo) postRepositoryInfo();
    };

    const postRepositoryInfo = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/add`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(repositoryInfo),
                }
            );

            if (!res.ok) {
                const errorResponse = await res.json();
                const statusCode = res.status;
                if (statusCode === 500) {
                    alert("Repository already exists");
                } else {
                    alert("Failed to post repository data");
                }
            } else {
                await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`);
                await alert("Added successful");
                push("/");
            }
        } catch (error) {
            alert("Error posting repositoryData to server");
        }
    };

    return (
        <div className="">
            <h1 className="text-center font-bold text-5xl mb-10">
                Add New Repository
            </h1>
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="row justify-center">
                    <div className="col-10">
                        <form className="" onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="text-lg">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    className="h-14 my-2 p-2 bg-[#2f3a47] focus:outline-none focus:bg-[#3e4c5e] w-full rounded "
                                    placeholder="name...."
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="org" className="text-lg">
                                    Org <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="org"
                                    name="org"
                                    className="h-14 my-2 p-2 bg-[#2f3a47] focus:outline-none focus:bg-[#3e4c5e] w-full rounded "
                                    placeholder="themefisher...."
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="img" className="text-lg">
                                    Image Url{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="img"
                                    name="img"
                                    className="h-14 my-2 p-2 bg-[#2f3a47] focus:outline-none focus:bg-[#3e4c5e] w-full rounded "
                                    placeholder="https://placehold.co/........."
                                    type="text"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#536271] rounded-lg text-center px-5 py-3"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
