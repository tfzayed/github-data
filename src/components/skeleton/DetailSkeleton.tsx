const DetailSkeleton = () => {
    return (
        <div className="mx-auto max-w-[1320px] px-4">
            <div className="lg:hidden flex flex-col items-center animate-pulse">
                <h1 className="bg-gray-300 w-3/4 h-10 mb-2"></h1>
                <h2 className="bg-gray-300 w-3/4 h-6"></h2>
            </div>

            <div className="row justify-center items-center mb-6 animate-pulse">
                <div className="lg:col-6 col-10 my-5">
                    <div className="bg-gray-300 w-full h-[480px] rounded-lg"></div>
                </div>
                <div className="lg:col-6 col-10">
                    <div className="lg:block hidden mb-4 lg:col-12">
                        <div className="flex items-center">
                            <h1 className="bg-gray-300 w-3/4 h-10 mb-2 mr-4"></h1>
                        </div>
                        <h2 className="bg-gray-300 w-3/4 h-6 mb-2"></h2>
                    </div>

                    <div className="row justify-center animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="mb-4 lg:col-6">
                                <div className="flex justify-center items-center text-center bg-gray-300 rounded-lg px-5 py-5">
                                    <h3 className="text-xl bg-gray-300 w-3/4 h-4 inline-block"></h3>
                                </div>
                            </div>
                        ))}
                        <div className="mb-4 col-12">
                            <div className="flex justify-center items-center text-center bg-gray-300 rounded-lg px-5 py-5">
                                <h3 className="text-xl bg-gray-300 w-3/4 h-4 inline-block"></h3>
                            </div>
                        </div>
                        <div className="mb-4 col-12">
                            <div className="flex justify-center items-center text-center bg-gray-300 rounded-lg px-5 py-5">
                                <h3 className="text-xl bg-gray-300 w-3/4 h-4 inline-block"></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {[1, 2].map((index) => (
                    <div key={index} className="col-12 lg:col-6 mb-6">
                        <h3 className=" text-2xl bg-gray-300 w-1/3 h-6 mb-4 mx-auto inline-block animate-pulse"></h3>
                        <div className="responsiveChart bg-gray-300 w-full h-80 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailSkeleton;
