const CardSkeleton = () => {
    return (
        <div className="col-4">
            <div className="bg-[#3e4c5e] p-10 mx-auto rounded-lg min-h-full animate-pulse">
                <div className="mb-2 mx-auto h-[225px] w-[300px] bg-gray-400 rounded"></div>
                <div className="my-6">
                    <div className="mb-2 h-6 bg-gray-400 w-1/2 rounded"></div>
                    <div className="mb-4 h-6 bg-gray-400 w-2/3 rounded"></div>
                    <div className="flex">
                        <div className="mb-2 font-bold h-4 bg-gray-400 w-1/4 rounded"></div>
                        <div className="mx-5 h-4 bg-gray-400 w-px rounded"></div>
                        <div className="mb-2 font-bold h-4 bg-gray-400 w-1/4 rounded"></div>
                    </div>
                    <div className="flex">
                        <div className="mb-4 font-bold h-4 bg-gray-400 w-1/4 rounded"></div>
                        <div className="mx-5 h-4 bg-gray-400 w-px rounded"></div>
                        <div className="mb-4 font-bold h-4 bg-gray-400 w-1/4 rounded"></div>
                    </div>
                    <div className="mb-2 font-bold h-4 bg-gray-400 w-1/2 rounded"></div>
                    <div className="mb-2 font-bold h-4 bg-gray-400 w-2/3 rounded"></div>
                </div>
                <div className="">
                    <div className="row">
                        <div className="col">
                            <div className="bg-[#536271] rounded-lg text-center block py-3 h-12"></div>
                        </div>
                        <div className="col">
                            <div className="bg-[#536271] rounded-lg text-center block py-3 h-12"></div>
                        </div>
                        <div className="col">
                            <div className="bg-[#536271] rounded-lg text-center block py-3 h-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
