const baseUrl = "http://localhost:4000";
//const baseUrl = "https://elite.herokuapp.com";
//const baseUrl = "https://distinct-flip-flops-tuna.cyclic.app"


export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};