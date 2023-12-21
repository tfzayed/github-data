const CardSkeleton = () => {
    return (
        <div className="col-10 md:col-6 lg:col-4">
            <div className="animate-pulse shadow-lg p-5 mx-auto rounded-lg min-h-full flex flex-col justify-between">
                <div className="bg-gray-300 w-full h-64 mb-2 mx-auto shadow-xl"></div>

                <div className="my-6">
                    <div className="flex items-center">
                        <div className="bg-gray-300 w-full h-6 mb-2 mr-2"></div>
                    </div>

                    <p className="mb-4 font-bold text">
                        <span className="bg-gray-300 w-1/4 h-4 inline-block"></span>
                    </p>

                    <div className="flex">
                        <div className="bg-gray-300 w-1/4 h-4 mb-2 mr-3"></div>
                        <div className="mx-5">-</div>
                        <div className="bg-gray-300 w-1/4 h-4 mb-2"></div>
                    </div>
                    <div className="flex">
                        <div className="bg-gray-300 w-1/4 h-4 mb-4 mr-3"></div>
                        <div className="mx-5">-</div>
                        <div className="bg-gray-300 w-1/4 h-4 mb-4"></div>
                    </div>

                    <p className="mb-2 font-bold">
                        <span className="bg-gray-300 w-3/4 h-4 inline-block"></span>
                    </p>
                    <p className="mb-2 font-bold">
                        <span className="bg-gray-300 w-3/4 h-4 inline-block"></span>
                    </p>
                </div>

                <div className="row g-1">
                    <div className="col-12 lg:col-6">
                        <div className="bg-gray-300 w-full h-10 rounded-lg"></div>
                    </div>
                    <div className="col-12 lg:col-6">
                        <div className="bg-gray-300 w-full h-10 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
