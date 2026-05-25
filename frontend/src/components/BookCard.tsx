type Props = {
    title: string;
    author: string;
    stock: number;
}

export const BookCard: React.FC<Props> = ({ title, author , stock }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{stock}</p>
        </div>
    );
};

export default BookCard;