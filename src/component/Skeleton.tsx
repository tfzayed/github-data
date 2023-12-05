export default function Skeleton() {
    return (
        <div className="col-4">
            <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-w-full min-h-full animate-pulse">
                <div className="">
                    <div>
                        <div className="mb-2 mx-auto h-64 bg-[#5b728f] rounded"></div>
                    </div>
                    <div>
                        <div className="my-6">
                            <div className="mb-2 font-bold text-xl h-6 bg-[#5b728f] rounded w-1/2"></div>
                            <div className="mb-4 font-bold text-xl h-6 bg-[#5b728f] rounded w-1/2">
                                <span className="font-normal"></span>
                            </div>
                            <div className="flex">
                                <div className="mb-2 font-bold h-6 bg-[#5b728f] rounded w-1/4"></div>
                                <p className="mx-5">-</p>
                                <div className="mb-2 font-bold h-6 bg-[#5b728f] rounded w-1/4"></div>
                            </div>
                            <div className="flex">
                                <div className="mb-4 font-bold h-6 bg-[#5b728f] rounded w-1/4"></div>
                                <p className="mx-5">-</p>
                                <div className="mb-4 font-bold h-6 bg-[#5b728f] rounded w-1/4"></div>
                            </div>
                            <div className="mb-2 font-bold h-6 bg-[#5b728f] rounded w-1/2"></div>
                            <div className="mb-2 font-bold h-6 bg-[#5b728f] rounded w-1/2"></div>
                        </div>
                        <div>
                            <div className="row justify-center">
                                <div className="col-6">
                                    <div className="bg-[#5b728f] rounded-lg h-10"></div>
                                </div>
                                <div className="col-6">
                                    <div className="bg-[#5b728f] rounded-lg h-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
