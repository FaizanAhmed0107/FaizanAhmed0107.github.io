"use client";

interface Props {
    data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
}

export default function ActionButtons({ data }: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
                className="text-base p-3 px-6 w-max text-cyan-300 bg-transparent border-2 border-cyan-400 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/20 active:translate-y-0.5 shadow-lg hover:shadow-cyan-400/20"
                onClick={() => window.open(data.github, '_blank', 'noopener,noreferrer')}
            >
                View My Work
            </button>
            <button
                className="text-base p-3 px-6 w-max text-gray-900 font-semibold bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg transition-transform duration-300 hover:-translate-y-1 active:translate-y-0.5 shadow-lg hover:shadow-green-400/30"
                onClick={() => window.open(data.cv, '_blank', 'noopener,noreferrer')}
            >
                Download Resume
            </button>
        </div>
    );
}
