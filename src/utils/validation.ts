export const isHebrewOnly = (text: string): boolean => {
  const hebrewRegex = /^[\u0590-\u05FF\s]*$/
  return hebrewRegex.test(text)
}

export const validateName = (text: string): string | null => {
  if (!text.trim()) {
    return 'שדה חובה'
  }
  if (text.trim().length < 2) {
    return 'השם חייב להכיל לפחות 2 תווים'
  }
  if (!isHebrewOnly(text)) {
    return 'יש להכניס אותיות עברית בלבד'
  }
  return null
}
