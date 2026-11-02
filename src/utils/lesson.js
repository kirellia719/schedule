/**
 * Một ô tiết có thể chứa nhiều bài học (nhiều môn trong cùng tiết).
 * Dữ liệu cũ lưu một object, dữ liệu mới lưu mảng.
 */
export function normalizeLessons(value) {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value.filter(
            (lesson) => lesson && (lesson.subject || lesson.teacher)
        );
    }

    if (value.subject || value.teacher) {
        return [value];
    }

    return [];
}
