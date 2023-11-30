import Github from "./component/Github";

export default function Home() {
    const token = process.env.GITHUB_TOKEN;
    const gitRepo = [
        "themefisher/academia-hugo",
        "themefisher/airspace-hugo",
        "gethugothemes/andromeda-light",
        "gethugothemes/bookworm-light-hugo",
        "themefisher/bigspring-hugo-startup-theme",
    ];

    return (
        <main className="py-24">
            <div className="mx-auto max-w-[1320px] px-4">
                <div className="row g-5">
                    {gitRepo.map((repo, i) => (
                        <Github key={i} gitRepo={repo} token={token} />
                    ))}
                </div>
            </div>
        </main>
    );
}
