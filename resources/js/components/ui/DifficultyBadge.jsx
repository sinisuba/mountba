const difficultyConfig = {
    easy: { label: 'Easy', classes: 'bg-green-100 text-green-800' },
    moderate: { label: 'Moderate', classes: 'bg-yellow-100 text-yellow-800' },
    strenuous: { label: 'Strenuous', classes: 'bg-orange-100 text-orange-800' },
    technical: { label: 'Technical', classes: 'bg-red-100 text-red-800' },
};

export default function DifficultyBadge({ difficulty }) {
    if (!difficulty) {
        return null;
    }

    const config = difficultyConfig[difficulty] || { label: difficulty, classes: 'bg-gray-100 text-gray-700' };

    return (
        <span className={`inline-block text-xs font-medium px-2 py-0.5 ${config.classes}`}>
            {config.label}
        </span>
    );
}
