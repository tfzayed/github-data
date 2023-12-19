const DetailSkeleton = () => {
    return (
        <div>
            <div className="row justify-center items-center mb-6 animate-pulse">
                <div className="mb-6 lg:col-6 col-10">
                    <div className="text-white bg-[#505f75] h-[471px] w-full rounded"></div>
                </div>

                <div className="lg:col-6 col-10">
                    <div className="row justify-center">
                        <div className="lg:block hidden mb-4 lg:col-10">
                            <div className="flex flex-col items-center mb-6">
                                <h1 className="font-bold text-5xl mb-4 text-white bg-[#505f75] h-12 w-64 rounded"></h1>
                                <h2 className="font-bold text-2xl text-white bg-[#505f75] h-8 w-40 rounded"></h2>
                            </div>
                        </div>
                        <div className="mb-4 lg:col-6">
                            <div className="text-center text-white bg-[#505f75] rounded-lg px-5 py-3 h-24"></div>
                        </div>
                        <div className="mb-4 lg:col-6">
                            <div className="text-center text-white bg-[#505f75] rounded-lg px-5 py-3 h-24"></div>
                        </div>
                        <div className="mb-4 lg:col-6">
                            <div className="text-center text-white bg-[#505f75] rounded-lg px-5 py-3 h-24"></div>
                        </div>
                        <div className="mb-4 lg:col-6">
                            <div className="text-center text-white bg-[#505f75] rounded-lg px-5 py-3 h-24"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <h3 className="text-center font-bold text-5xl mb-4 text-white bg-[#505f75] h-12 w-64 rounded"></h3>
            </div>
            <div className="responsiveChart">
                <div className="text-white bg-[#505f75] h-96 w-full rounded"></div>
            </div>

            <div className="flex flex-col items-center">
                <h3 className="text-center font-bold text-5xl mb-4 text-white bg-[#505f75] h-12 w-64 rounded"></h3>
            </div>
            <div className="responsiveChart">
                <div className="text-white bg-[#505f75] h-96 w-full rounded"></div>
            </div>
        </div>
    );
};

export default DetailSkeleton;
