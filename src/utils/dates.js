export const formatISODate = (date) => {
    return date.toISOString().split('T')[0]
}