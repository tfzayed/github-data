export async function getData() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Initail Data fetching error:", error);
    }
}

export async function getDetails(name: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/get/${name}`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch details");
        }

        return res.json();
    } catch (error) {
        console.error("Details fetching error:", error);
    }
}