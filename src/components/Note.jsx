export default function Note({ note, onDelete }) {
    const formatDate = new Date(note.created_at).toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        dateStyle: 'medium',
        timeStyle: 'short',
    })

    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <p className="text-xl font-bold text-blue-700 mb-1">{note.title}</p>
            <p className="text-gray-800 mb-3 whitespace-pre-line">{note.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{formatDate}</span>
                <button
                    className="text-red-600 hover:underline font-medium"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
