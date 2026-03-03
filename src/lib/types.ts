export interface Event {
  _id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  gallery: string[];
  pricing: {
    basic: number;
    premium: number;
    luxury: number;
  };
  features: string[];
  timeline: {
    step: string;
    description: string;
  }[];
  isFeatured: boolean;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientImage: string;
  rating: number;
  review: string;
  eventType: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

export interface Booking {
  _id: string;
  eventId?: string;
  name: string;
  email: string;
  date: string;
  guests: number;
  message?: string;
  createdAt: number;
}
