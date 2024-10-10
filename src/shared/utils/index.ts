export const getInfoData = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key as K))
    .reduce<Partial<T>>((acc, [key, value]) => {
      acc[key as keyof T] = value
      return acc
    }, {})
}

export const unGetInfoData = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key as K))
    .reduce<Partial<T>>((acc, [key, value]) => {
      acc[key as keyof T] = value
      return acc
    }, {})
}
