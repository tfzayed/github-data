import Github from "./component/Github";
import { Repositories } from "./component/Repositories";

export default function Home() {
    const token = process.env.GITHUB_TOKEN;

    return (
        <main className="py-24">
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="row g-5">
                    {Repositories.map((repository, i) => (
                        <Github
                            key={i}
                            name={repository.name}
                            org={repository.org}
                            image={repository.image}
                            token={token}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
