function addMessages(value, messages) {
    if (typeof value === 'string' && value.trim()) {
        messages.push(value.trim())
    } else if (Array.isArray(value)) {
        value.forEach((item) => addMessages(item, messages))
    } else if (value && typeof value === 'object') {
        if (typeof value.message === 'string') {
            addMessages(value.message, messages)
        } else {
            Object.values(value).forEach((item) => addMessages(item, messages))
        }
    }
}

export function getApiErrorMessages(error, fallback) {
    const payload = error?.response?.data
    const messages = []

    addMessages(payload?.message, messages)
    addMessages(payload?.error, messages)
    addMessages(payload?.errors, messages)

    const uniqueMessages = [...new Set(messages)]
    if (uniqueMessages.length > 0) {
        return uniqueMessages
    }

    if (!error?.response && error?.request) {
        return ['Unable to reach the server. Check your connection and try again.']
    }

    return [fallback]
}