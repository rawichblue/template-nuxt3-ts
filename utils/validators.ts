export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 8 // อย่างน้อย 8 ตัวอักษร
  }
  
  export const validateName = (name: string): boolean => {
    return name.trim().length > 0 // ต้องไม่ว่างเปล่า
  }
  
  export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+\d][\d\s\-]{6,15}$/
    return phoneRegex.test(phone)
  }
  
  export const validateAddress = (address: string): boolean => {
    return address.trim().length >= 10 // ต้องมีอย่างน้อย 10 ตัวอักษร
  }
  