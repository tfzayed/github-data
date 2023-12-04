import GetRepo from "./component/GetRepo";

export default function Home() {
    const token: string = process.env.GITHUB_TOKEN!;
    return (
        <main className="py-24">
            <h1 className="text-center font-bold text-5xl mb-10">
                Repositories
            </h1>
            <div className="mx-auto max-w-[1320px] px-4">
                <GetRepo token={token} />
            </div>
        </main>
    );
}
