export const FileAccept = {
    image: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    pdf: { 'application/pdf': ['.pdf'] },
    excel: {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls'],
    },
    word: {
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/msword': ['.doc'],
    },
};
