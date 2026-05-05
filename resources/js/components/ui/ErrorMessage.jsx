export default function ErrorMessage({ message = 'Something went wrong.' }) {
    return (
        <div className="border border-red-300 bg-red-50 text-red-800 px-4 py-3 text-sm">
            {message}
        </div>
    );
}
