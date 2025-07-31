
export default function SectionContainer({ title, children }) {
    return (
        <div className="container-main text-center">
            <h2 className="section-title">{title}</h2>
            <div className="section-content">{children}</div>
        </div>
    );
}
