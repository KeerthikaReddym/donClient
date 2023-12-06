export type Product = {
  id: number;
  name: string;
  description: string;
  image: string[];
  user: {
    name: string;
    emailId: string;
    profilePic: File;
  }
  date: string;
  condition: string;
  category: string;
  price: number;
};
