export interface Profile {
  name: string;
  title: string;
  bio: string;
  bioSecondary?: string;
  email: string;
  location: string;
  availability?: string;
  imageUrl?: string;
}
