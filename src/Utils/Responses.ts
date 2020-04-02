export const successRes = (data: any)=>{
  return {
    ...data,
    status: true,
  }
}

export const errorRes = (err: any)=>{
  return {
    status: false,
    error: err
  }
}
