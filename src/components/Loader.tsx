

const Loader = () => {
    return (
        <section className="loader">
            <div></div>
        </section>
    )
}

interface SkeletonProps {
    width?: string;
    length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
    const skeletons = Array.from({ length }, (_, k) => {
        return <div className="skeleton-shape" key={k}>

        </div>
    })
    return <div className="skeleton-loader" style={{ width }}>
        {skeletons}
    </div>
}

export default Loader;