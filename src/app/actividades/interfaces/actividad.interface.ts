export interface Actividad {
    _id?:          string;
    name:         string;
    description:   string;
    hourhand:     string;
    image:     string;
    participants: number;
    registered: string[];
    waiting_list: string[];
}