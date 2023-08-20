import { useRouter } from "next/navigation";

function EmptyList({title, description}) {
    const router = useRouter();

    const reloadPage = () => {
        router.refresh();
    };

    return (
        <div className="px-4 flex-center">
            <div className="text-center">
                <p className="text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">
                    {title && title}
                </p>
                <p className="mt-4 text-gray-500">
                    {description && description}
                </p>
                <div className="p-5 flex-center">
                    <button className="black_btn" onClick={reloadPage}>
                        Reload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmptyList