export interface Service {
  title: string;
  description: string;
  image: string;
  details: string;
  process: { title: string; description: string }[];
  technologies: { name: string; description: string }[];
}
